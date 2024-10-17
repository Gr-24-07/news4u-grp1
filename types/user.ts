export enum Role {
  USER = "USER",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
}

export type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string;
  role: Role;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  newsletter: boolean;
  subscription: Subscription | null;
  articles: Article[];
  accounts: Account[];
  sessions: Session[];
  createdAt: Date;
  updatedAt: Date;
};

export type Account = {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export type Session = {
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};

export type Article = {
  id: string;
  headline: string;
  summary: string;
  content: string;
  views: number;
  image: string;
  paid: boolean;
  editorsChoice: boolean;
  category: Category[];
  createdAt: Date;
  updatedAt: Date;
  author: User;
  userId: string;
};

export type Category = {
  id: string;
  name: string;
  articles: Article[];
};

export type Subscription = {
  id: string;
  priceInCents: number;
  createdAt: Date;
  expiresAt: Date;
  cancelledAt: Date | null;
  status: string;
  user: User;
  userId: string;
  autoRenew: boolean;
  subscriptionType: SubscriptionType;
  subscriptionTypeId: string;
};

export type SubscriptionType = {
  id: string;
  name: string;
  description: string;
  slug: string;
  priceInCents: number;
  durationInSeconds: number;
  subscriptions: Subscription[];
};

export type ProfilePageProps = {
  user: User;
  error?: string;
};
