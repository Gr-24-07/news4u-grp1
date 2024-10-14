import crypto from "crypto";
import prisma from "@/lib/db";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString("hex");
const IV_LENGTH = 16;

// Ensure the key is always 32 bytes (256 bits)
const getKey = () => {
  const key = Buffer.from(ENCRYPTION_KEY, "hex");
  return key.length === 32
    ? key
    : crypto.scryptSync(ENCRYPTION_KEY, "salt", 32);
};

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createVerificationToken(
  identifier: string
): Promise<string> {
  const token = generateVerificationToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  await prisma.verificationToken.create({
    data: {
      identifier,
      token,
      expires,
    },
  });

  return token;
}

export async function cleanupExpiredTokens(): Promise<void> {
  await prisma.verificationToken.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      },
    },
  });
}

export function generateResetToken(email: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey();
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const timestamp = Date.now();
  const encrypted = cipher.update(`${email}|${timestamp}`);
  const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + finalBuffer.toString("hex");
}

export function validateResetToken(token: string): {
  email: string;
  isValid: boolean;
} {
  console.log("Entering validateResetToken");
  console.log("Received token:", token);

  try {
    if (!token) {
      console.error("Token is undefined or empty in validateResetToken");
      return { email: "", isValid: false };
    }

    console.log("Splitting token");
    const [ivHex, encryptedHex] = token.split(":");
    console.log("ivHex:", ivHex);
    console.log("encryptedHex:", encryptedHex);

    if (!ivHex || !encryptedHex) {
      console.error("Invalid token format");
      return { email: "", isValid: false };
    }

    console.log("Creating Buffer from ivHex");
    const iv = Buffer.from(ivHex, "hex");
    console.log("IV Buffer:", iv);

    console.log("Creating Buffer from encryptedHex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    console.log("Encrypted Buffer:", encrypted);

    const key = getKey();
    console.log("Got key");

    console.log("Creating decipher");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    console.log("Decrypting");
    const decrypted = decipher.update(encrypted);
    const finalBuffer = Buffer.concat([decrypted, decipher.final()]);

    console.log("Parsing decrypted data");
    const [email, timestamp] = finalBuffer.toString().split("|");
    console.log("Parsed email:", email);
    console.log("Parsed timestamp:", timestamp);

    const isValid = Date.now() - parseInt(timestamp) < 3600000; // Valid for 1 hour
    console.log("Token validity:", isValid);

    return { email, isValid };
  } catch (error) {
    console.error("Token validation error:", error);
    return { email: "", isValid: false };
  }
}

export async function createResetToken(email: string): Promise<string> {
  const token = generateResetToken(email);
  const expires = new Date(Date.now() + 3600000); // 1 hour from now

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

export async function validateAndConsumeResetToken(token: string): Promise<{
  email: string;
  isValid: boolean;
  isVerificationToken: boolean;
}> {
  console.log("Entering validateAndConsumeResetToken");
  console.log("Received token:", token);

  if (!token) {
    console.error("Token is undefined or empty");
    return { email: "", isValid: false, isVerificationToken: false };
  }

  // First, try to validate as a reset token
  console.log("Attempting to validate as reset token");
  const resetTokenResult = validateResetToken(token);

  if (resetTokenResult.isValid) {
    console.log("Valid reset token");
    // Process as reset token
    const storedToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: resetTokenResult.email,
          token,
        },
      },
    });

    if (!storedToken) {
      console.log("Stored token not found");
      return {
        email: resetTokenResult.email,
        isValid: false,
        isVerificationToken: false,
      };
    }

    if (storedToken.expires < new Date()) {
      console.log("Token has expired");
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: resetTokenResult.email,
            token,
          },
        },
      });
      return {
        email: resetTokenResult.email,
        isValid: false,
        isVerificationToken: false,
      };
    }

    console.log("Token is valid, consuming it");
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: resetTokenResult.email,
          token,
        },
      },
    });

    console.log("Token consumed successfully");
    return { ...resetTokenResult, isVerificationToken: false };
  }

  // If not a valid reset token, check if it's a verification token
  console.log("Not a valid reset token, checking as verification token");
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (verificationToken) {
    console.log("Valid verification token found");
    const isValid = new Date() <= verificationToken.expires;
    if (isValid) {
      // Consume the verification token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationToken.identifier,
            token,
          },
        },
      });
      console.log("Verification token consumed successfully");
    }
    return {
      email: verificationToken.identifier,
      isValid,
      isVerificationToken: true,
    };
  }

  console.log(
    "Token is neither a valid reset token nor a valid verification token"
  );
  return { email: "", isValid: false, isVerificationToken: false };
}
