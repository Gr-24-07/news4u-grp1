import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
    await prisma.subscriptionType.createMany({
        data: [
            {
                description: "Subscribe for 1 month",
                durationInSeconds: 2.628e6,
                name: "1 Month",
                slug: "1-month",
                priceInCents: 999,
            },
            {
                description: "Subscribe for 12 months",
                durationInSeconds: 3.154e7,
                name: "12 Months",
                slug: "12-months",
                priceInCents: 9999,
            },
        ],
    });

    const sub = await prisma.subscriptionType.findFirst();

    const hashedPassword = await bcrypt.hash("12345678", 10);
    const user = await prisma.user.create({
        data: {
            email: "test@test.se",
            password: hashedPassword,
            firstName: "Erik",
            lastName: "Eriksson",
            role: "ADMIN",
            emailVerified: new Date(),
            subscription: {
                create: {
                    expiresAt: new Date("2025-12-12"),
                    priceInCents: 999,
                    autoRenew: true,
                    subscriptionType: {
                        connect: {
                            id: sub?.id,
                        },
                    },
                },
            },
        },
    });

    //Categories
    const categories = [
        {
            name: "Local",
        },
        {
            name: "National",
        },
        {
            name: "International",
        },
        {
            name: "Economy",
        },
        {
            name: "Business",
        },
        {
            name: "Sport",
        },
        {
            name: "Entertainment",
        },
        {
            name: "Live",
        },
        {
            name: "Weather",
        },
    ];

    await prisma.category.createMany({
        data: categories,
    });

    //Business
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Business",
                },
            },
            editorsChoice: true,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Business",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Business",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Business",
                },
            },
        },
    });
    //International
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "International",
                },
            },
            editorsChoice: true,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "International",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "International",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "International",
                },
            },
        },
    });
    //Local
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Local",
                },
            },
            editorsChoice: true,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Local",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Local",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
            `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Local",
                },
            },
        },
    });

    //Sport
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Sport",
                },
            },
            editorsChoice: true,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Sport",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Sport",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Sport",
                },
            },
            paid: false,
        },
    });
    //National
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "National",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "National",
                },
            },
            editorsChoice: true,
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "National",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "National",
                },
            },
        },
    });
    //Economy
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Economy",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Economy",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Economy",
                },
            },
            editorsChoice: true,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Economy",
                },
            },
            paid: false,
        },
    });
    //Entertainment
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Entertainment",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Entertainment",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Entertainment",
                },
            },
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Entertainment",
                },
            },
        },
    });
    //Live
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Live",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Live",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Live",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Live",
                },
            },
            paid: false,
        },
    });
    //Weather
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Weather",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Weather",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Weather",
                },
            },
            paid: false,
        },
    });
    await prisma.article.create({
        data: {
            userId: user.id,
            headline: "Breaking News: Market Hits New High",
            content: `
                    <p>The stock market reached a new high today, with major indices showing gains across the board. Investors are optimistic about the upcoming earnings season, and experts believe this trend could continue well into the next quarter. The recent economic policies have contributed significantly to stabilizing market conditions, and this has paved the way for renewed investor confidence.</p>
                    <p>The rise in stock prices is particularly noticeable in the technology sector, where companies have seen a surge in revenue due to increased demand for digital solutions in the wake of the global shift towards remote work and online services. This transformation in the way businesses operate has been a major catalyst for growth, driving innovation and creating new opportunities in various industries.</p>
                    <p>Analysts have noted that the market's resilience is largely due to lower interest rates and improved economic indicators, which have spurred consumer spending and investment. The central bank's recent decision to keep rates unchanged has further fueled this bullish sentiment, as it signals a favorable economic outlook. This has also led to a rise in consumer confidence, which is a critical factor in sustaining economic growth.</p>
                    <p>Moreover, the healthcare and renewable energy sectors have also shown remarkable progress. Companies in these fields are benefiting from increased government incentives and a growing emphasis on sustainability. As countries around the world focus on reducing carbon emissions and improving public health infrastructure, these sectors are likely to see continued investment and expansion.</p>
                    <p>Investors are advised to diversify their portfolios to include assets in these promising sectors, as they are expected to yield substantial returns in the coming years. Financial experts suggest that while the market is currently on an upswing, it is essential to remain vigilant and conduct thorough research before making any investment decisions.</p>
                    <p>For those looking to capitalize on these market trends, now might be an opportune time to explore growth stocks and emerging market funds. These investments typically carry higher risk, but they also offer the potential for significant gains. It's always wise to consult with a financial advisor to understand the risks involved and to create a balanced investment strategy that aligns with your financial goals.</p>
                    <p>Looking ahead, the focus will be on how companies perform during the upcoming earnings season and whether they can meet or exceed market expectations. A strong earnings season could propel the market to new heights, while any setbacks might lead to short-term corrections. In either scenario, staying informed and prepared will be key to navigating the market's ups and downs.</p>
                `,
            image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
            summary:
                "The stock market reached a new high today, sparking optimism among investors.",
            category: {
                connect: {
                    name: "Weather",
                },
            },
            paid: false,
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
