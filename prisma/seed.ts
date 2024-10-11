import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash("12345678", 10);
    const user = await prisma.user.create({
        data: {
            email: "test@test.se",
            password: hashedPassword,
            firstName: "Erik",
            lastName: "Eriksson",
            role: "ADMIN",
            emailVerified: new Date(),
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
            name: "Sports",
        },
        {
            name: "Entertainment",
        },
        {
            name: "Live",
        },
    ];

    await prisma.category.createMany({
        data: categories,
    });

    //SubType

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

    // {
    //     userId: user.id,
    //     headline: "Local Festival Draws Thousands",
    //     content: `
    //         <p>The annual local festival drew a crowd of over 10,000 people this weekend, making it one of the most successful events in recent years. Attendees from across the region flocked to the event to enjoy a wide variety of attractions, including live music, dance performances, and food stalls that featured local delicacies from different cultures.</p>
    //         <p>This year, the festival organizers went all out to ensure there was something for everyone. The event included a children's play area with games and activities designed to entertain the younger attendees, while adults were treated to a diverse lineup of music and dance shows representing various cultural backgrounds.</p>
    //         <p>One of the highlights of the festival was the grand parade, which featured elaborately decorated floats and performers in traditional attire. The parade's theme focused on celebrating the community's rich heritage and diversity, and it received a warm reception from the crowd. Local artists also showcased their talents through art installations that were displayed throughout the festival grounds.</p>
    //         <p>The evening concluded with a spectacular fireworks display that lit up the sky, leaving the audience in awe. It was a fitting end to a day filled with joy, laughter, and a sense of togetherness. The festival's success is a testament to the hard work of the organizers and the support of the local community.</p>
    //         <p>As the event came to a close, many attendees expressed their excitement for next year's festival, which promises to be even bigger and better. Plans are already underway to expand the festival's activities and bring in more performers from around the world, making it a truly global celebration of culture and unity.</p>
    //         <p>For those who missed out on this year's festivities, don't worry. There will be plenty of opportunities to experience the magic of the local festival in the years to come. Keep an eye out for announcements on next year's lineup, and be sure to mark your calendar!</p>
    //     `,
    //     image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
    //     summary: "The local festival was a huge success, attracting a large crowd with its vibrant activities.",
    //     categoryId: categoryMap["Local"],
    // },
    // {
    //     userId: user.id,
    //     headline: "Sports Update: Local Team Wins Championship",
    //     content: `
    //         <p>In an electrifying showdown, the local football team clinched the championship title last night, much to the delight of fans who filled the stadium to capacity. The team's journey to the top was marked by a series of intense matches that tested their skill, endurance, and determination.</p>
    //         <p>The match began with both teams playing defensively, but as the game progressed, the local team found their rhythm and launched a series of attacks that eventually broke through the opposition's defense. The winning goal was scored in the final minutes, a moment that will be etched in the memories of the fans for years to come.</p>
    //         <p>After the match, the team's coach praised the players for their unwavering commitment and highlighted the role of their rigorous training regimen in achieving this victory. The coach also emphasized the importance of teamwork, stating that every player contributed to the win in their unique way.</p>
    //         <p>The celebrations continued late into the night as fans flooded the streets, waving flags and chanting the team's name. The local community came together in a spirit of unity and pride, celebrating not just the team's victory but also the sense of belonging that sports bring to their lives.</p>
    //         <p>Looking ahead, the team's focus will be on preparing for the next season, where they aim to defend their title and continue their dominance in the league. The coach hinted at potential new signings and strategic changes that could give the team an edge in the future.</p>
    //         <p>With this win, the local football team has set a new benchmark for excellence in the sport, and fans eagerly await what promises to be another thrilling season ahead. Stay tuned for exclusive interviews with the players and insights into their training routines in our upcoming editions.</p>
    //     `,
    //     image: "https://images.aftonbladet-cdn.se/v2/images/b6a6fd1b-a611-4faf-a351-39bea1890965?fit=crop&format=auto&h=315&q=50&w=900&s=f7c610ed676bd87cf28bb1e3216f96f0ca09a00a",
    //     summary: "The local football team celebrates their victory in the championship match.",
    //     categoryId: categoryMap["Sports"],
    // },

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
