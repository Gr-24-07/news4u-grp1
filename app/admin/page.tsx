import { ChartConfig } from "@/components/ui/chart";
import {
    getNewSubscribersData,
    getSubscriptionCountsByType,
} from "../data/subscriptions";
import NewSubsChart from "./new-sub-chart";

export default async function AdminPage() {
    const subStats = await getSubscriptionCountsByType();
    // const subChartData = await getNewSubscribersData();

    const subChartData = [
        { date: "2024-01-01", "12 Months": 300, "1 Month": 100 },
        { date: "2024-01-02", "12 Months": 250, "1 Month": 120 },
        { date: "2024-01-03", "12 Months": 280, "1 Month": 150 },
        { date: "2024-01-04", "12 Months": 270, "1 Month": 130 },
        { date: "2024-01-05", "12 Months": 290, "1 Month": 110 },
        { date: "2024-01-06", "12 Months": 320, "1 Month": 160 },
        { date: "2024-01-07", "12 Months": 310, "1 Month": 170 },
        { date: "2024-01-08", "12 Months": 330, "1 Month": 180 },
        { date: "2024-01-09", "12 Months": 340, "1 Month": 190 },
        { date: "2024-01-10", "12 Months": 360, "1 Month": 200 },
        { date: "2024-01-11", "12 Months": 350, "1 Month": 210 },
        { date: "2024-01-12", "12 Months": 340, "1 Month": 220 },
        { date: "2024-01-13", "12 Months": 320, "1 Month": 230 },
        { date: "2024-01-14", "12 Months": 310, "1 Month": 240 },
        { date: "2024-01-15", "12 Months": 330, "1 Month": 200 },
        { date: "2024-01-16", "12 Months": 300, "1 Month": 180 },
        { date: "2024-01-17", "12 Months": 280, "1 Month": 190 },
        { date: "2024-01-18", "12 Months": 290, "1 Month": 150 },
        { date: "2024-01-19", "12 Months": 270, "1 Month": 140 },
        { date: "2024-01-20", "12 Months": 260, "1 Month": 135 },
        { date: "2024-01-21", "12 Months": 250, "1 Month": 130 },
        { date: "2024-01-22", "12 Months": 240, "1 Month": 125 },
        { date: "2024-01-23", "12 Months": 230, "1 Month": 120 },
        { date: "2024-01-24", "12 Months": 220, "1 Month": 115 },
        { date: "2024-01-25", "12 Months": 210, "1 Month": 110 },
        { date: "2024-01-26", "12 Months": 200, "1 Month": 105 },
        { date: "2024-01-27", "12 Months": 210, "1 Month": 100 },
        { date: "2024-01-28", "12 Months": 230, "1 Month": 95 },
        { date: "2024-01-29", "12 Months": 240, "1 Month": 90 },
        { date: "2024-01-30", "12 Months": 250, "1 Month": 85 },
        { date: "2024-01-31", "12 Months": 260, "1 Month": 80 },
        { date: "2024-02-01", "12 Months": 270, "1 Month": 75 },
        { date: "2024-02-02", "12 Months": 280, "1 Month": 70 },
        { date: "2024-02-03", "12 Months": 290, "1 Month": 65 },
        { date: "2024-02-04", "12 Months": 300, "1 Month": 60 },
        { date: "2024-02-05", "12 Months": 290, "1 Month": 55 },
        { date: "2024-02-06", "12 Months": 280, "1 Month": 50 },
        { date: "2024-02-07", "12 Months": 270, "1 Month": 55 },
        { date: "2024-02-08", "12 Months": 260, "1 Month": 60 },
        { date: "2024-02-09", "12 Months": 270, "1 Month": 65 },
        { date: "2024-02-10", "12 Months": 280, "1 Month": 70 },
        { date: "2024-02-11", "12 Months": 290, "1 Month": 75 },
        { date: "2024-02-12", "12 Months": 300, "1 Month": 80 },
        { date: "2024-02-13", "12 Months": 310, "1 Month": 85 },
        { date: "2024-02-14", "12 Months": 300, "1 Month": 90 },
        { date: "2024-02-15", "12 Months": 290, "1 Month": 95 },
        { date: "2024-02-16", "12 Months": 280, "1 Month": 100 },
        { date: "2024-02-17", "12 Months": 290, "1 Month": 90 },
        { date: "2024-02-18", "12 Months": 300, "1 Month": 85 },
        { date: "2024-02-19", "12 Months": 310, "1 Month": 80 },
        { date: "2024-02-20", "12 Months": 320, "1 Month": 75 },
        { date: "2024-02-21", "12 Months": 330, "1 Month": 70 },
        { date: "2024-02-22", "12 Months": 320, "1 Month": 65 },
        { date: "2024-02-23", "12 Months": 310, "1 Month": 60 },
        { date: "2024-02-24", "12 Months": 300, "1 Month": 55 },
        { date: "2024-02-25", "12 Months": 290, "1 Month": 50 },
        { date: "2024-02-26", "12 Months": 280, "1 Month": 45 },
        { date: "2024-02-27", "12 Months": 270, "1 Month": 50 },
        { date: "2024-02-28", "12 Months": 260, "1 Month": 55 },
        { date: "2024-02-29", "12 Months": 270, "1 Month": 60 },
        { date: "2024-03-01", "12 Months": 280, "1 Month": 65 },
        { date: "2024-03-02", "12 Months": 290, "1 Month": 70 },
        { date: "2024-03-03", "12 Months": 300, "1 Month": 75 },
        { date: "2024-03-04", "12 Months": 290, "1 Month": 80 },
        { date: "2024-03-05", "12 Months": 280, "1 Month": 85 },
        { date: "2024-03-06", "12 Months": 270, "1 Month": 90 },
        { date: "2024-03-07", "12 Months": 260, "1 Month": 95 },
        { date: "2024-03-08", "12 Months": 250, "1 Month": 100 },
        { date: "2024-03-09", "12 Months": 240, "1 Month": 105 },
        { date: "2024-03-10", "12 Months": 230, "1 Month": 110 },
        { date: "2024-03-11", "12 Months": 240, "1 Month": 120 },
        { date: "2024-03-12", "12 Months": 250, "1 Month": 130 },
        { date: "2024-03-13", "12 Months": 260, "1 Month": 140 },
        { date: "2024-03-14", "12 Months": 270, "1 Month": 150 },
        { date: "2024-03-15", "12 Months": 280, "1 Month": 160 },
        { date: "2024-03-16", "12 Months": 290, "1 Month": 155 },
        { date: "2024-03-17", "12 Months": 300, "1 Month": 150 },
        { date: "2024-03-18", "12 Months": 310, "1 Month": 145 },
        { date: "2024-03-19", "12 Months": 320, "1 Month": 140 },
        { date: "2024-03-20", "12 Months": 330, "1 Month": 135 },
        { date: "2024-03-21", "12 Months": 340, "1 Month": 130 },
        { date: "2024-03-22", "12 Months": 350, "1 Month": 125 },
        { date: "2024-03-23", "12 Months": 360, "1 Month": 120 },
        { date: "2024-03-24", "12 Months": 370, "1 Month": 115 },
        { date: "2024-03-25", "12 Months": 360, "1 Month": 110 },
        { date: "2024-03-26", "12 Months": 350, "1 Month": 115 },
        { date: "2024-03-27", "12 Months": 340, "1 Month": 120 },
        { date: "2024-03-28", "12 Months": 330, "1 Month": 125 },
        { date: "2024-03-29", "12 Months": 320, "1 Month": 130 },
        { date: "2024-03-30", "12 Months": 310, "1 Month": 135 },
        { date: "2024-03-31", "12 Months": 300, "1 Month": 140 },
        { date: "2024-04-01", "12 Months": 290, "1 Month": 145 },
        { date: "2024-04-02", "12 Months": 280, "1 Month": 140 },
        { date: "2024-04-03", "12 Months": 270, "1 Month": 135 },
        { date: "2024-04-04", "12 Months": 260, "1 Month": 130 },
        { date: "2024-04-05", "12 Months": 250, "1 Month": 125 },
        { date: "2024-04-06", "12 Months": 260, "1 Month": 130 },
        { date: "2024-04-07", "12 Months": 270, "1 Month": 135 },
        { date: "2024-04-08", "12 Months": 280, "1 Month": 140 },
        { date: "2024-04-09", "12 Months": 290, "1 Month": 145 },
        { date: "2024-04-10", "12 Months": 300, "1 Month": 150 },
        { date: "2024-04-11", "12 Months": 310, "1 Month": 155 },
        { date: "2024-04-12", "12 Months": 320, "1 Month": 160 },
        { date: "2024-04-13", "12 Months": 330, "1 Month": 165 },
        { date: "2024-04-14", "12 Months": 340, "1 Month": 170 },
        { date: "2024-04-15", "12 Months": 350, "1 Month": 175 },
        { date: "2024-04-16", "12 Months": 340, "1 Month": 160 },
        { date: "2024-04-17", "12 Months": 330, "1 Month": 150 },
        { date: "2024-04-18", "12 Months": 320, "1 Month": 140 },
        { date: "2024-04-19", "12 Months": 310, "1 Month": 130 },
        { date: "2024-04-20", "12 Months": 300, "1 Month": 120 },
        { date: "2024-04-21", "12 Months": 290, "1 Month": 110 },
        { date: "2024-04-22", "12 Months": 280, "1 Month": 120 },
        { date: "2024-04-23", "12 Months": 270, "1 Month": 130 },
        { date: "2024-04-24", "12 Months": 260, "1 Month": 125 },
        { date: "2024-04-25", "12 Months": 270, "1 Month": 130 },
        { date: "2024-04-26", "12 Months": 280, "1 Month": 135 },
        { date: "2024-04-27", "12 Months": 290, "1 Month": 140 },
        { date: "2024-04-28", "12 Months": 300, "1 Month": 145 },
        { date: "2024-04-29", "12 Months": 310, "1 Month": 150 },
        { date: "2024-04-30", "12 Months": 320, "1 Month": 155 },
        { date: "2024-05-01", "12 Months": 330, "1 Month": 160 },
        { date: "2024-05-02", "12 Months": 340, "1 Month": 165 },
        { date: "2024-05-03", "12 Months": 350, "1 Month": 170 },
        { date: "2024-05-04", "12 Months": 360, "1 Month": 175 },
        { date: "2024-05-05", "12 Months": 370, "1 Month": 180 },
        { date: "2024-05-06", "12 Months": 380, "1 Month": 185 },
        { date: "2024-05-07", "12 Months": 390, "1 Month": 190 },
        { date: "2024-05-08", "12 Months": 400, "1 Month": 195 },
        { date: "2024-05-09", "12 Months": 410, "1 Month": 200 },
        { date: "2024-05-10", "12 Months": 420, "1 Month": 205 },
        { date: "2024-05-11", "12 Months": 430, "1 Month": 210 },
        { date: "2024-05-12", "12 Months": 440, "1 Month": 215 },
        { date: "2024-05-13", "12 Months": 430, "1 Month": 220 },
        { date: "2024-05-14", "12 Months": 420, "1 Month": 215 },
        { date: "2024-05-15", "12 Months": 410, "1 Month": 210 },
        { date: "2024-05-16", "12 Months": 400, "1 Month": 205 },
        { date: "2024-05-17", "12 Months": 390, "1 Month": 200 },
        { date: "2024-05-18", "12 Months": 380, "1 Month": 195 },
        { date: "2024-05-19", "12 Months": 370, "1 Month": 190 },
        { date: "2024-05-20", "12 Months": 360, "1 Month": 185 },
        { date: "2024-05-21", "12 Months": 350, "1 Month": 180 },
        { date: "2024-05-22", "12 Months": 340, "1 Month": 175 },
        { date: "2024-05-23", "12 Months": 330, "1 Month": 170 },
        { date: "2024-05-24", "12 Months": 320, "1 Month": 165 },
        { date: "2024-05-25", "12 Months": 310, "1 Month": 160 },
        { date: "2024-05-26", "12 Months": 300, "1 Month": 155 },
        { date: "2024-05-27", "12 Months": 290, "1 Month": 150 },
        { date: "2024-05-28", "12 Months": 280, "1 Month": 145 },
        { date: "2024-05-29", "12 Months": 270, "1 Month": 140 },
        { date: "2024-05-30", "12 Months": 260, "1 Month": 135 },
        { date: "2024-05-31", "12 Months": 250, "1 Month": 130 },
        { date: "2024-06-01", "12 Months": 260, "1 Month": 135 },
        { date: "2024-06-02", "12 Months": 270, "1 Month": 140 },
        { date: "2024-06-03", "12 Months": 280, "1 Month": 145 },
        { date: "2024-06-04", "12 Months": 290, "1 Month": 150 },
        { date: "2024-06-05", "12 Months": 300, "1 Month": 155 },
        { date: "2024-06-06", "12 Months": 310, "1 Month": 160 },
        { date: "2024-06-07", "12 Months": 320, "1 Month": 165 },
        { date: "2024-06-08", "12 Months": 330, "1 Month": 170 },
        { date: "2024-06-09", "12 Months": 340, "1 Month": 175 },
        { date: "2024-06-10", "12 Months": 350, "1 Month": 180 },
        { date: "2024-06-11", "12 Months": 360, "1 Month": 185 },
        { date: "2024-06-12", "12 Months": 370, "1 Month": 190 },
        { date: "2024-06-13", "12 Months": 380, "1 Month": 195 },
        { date: "2024-06-14", "12 Months": 390, "1 Month": 200 },
        { date: "2024-06-15", "12 Months": 400, "1 Month": 205 },
        { date: "2024-06-16", "12 Months": 410, "1 Month": 210 },
        { date: "2024-06-17", "12 Months": 420, "1 Month": 215 },
        { date: "2024-06-18", "12 Months": 430, "1 Month": 220 },
        { date: "2024-06-19", "12 Months": 440, "1 Month": 225 },
        { date: "2024-06-20", "12 Months": 450, "1 Month": 230 },
        { date: "2024-06-21", "12 Months": 440, "1 Month": 235 },
        { date: "2024-06-22", "12 Months": 430, "1 Month": 240 },
        { date: "2024-06-23", "12 Months": 420, "1 Month": 245 },
        { date: "2024-06-24", "12 Months": 410, "1 Month": 250 },
        { date: "2024-06-25", "12 Months": 400, "1 Month": 255 },
        { date: "2024-06-26", "12 Months": 390, "1 Month": 260 },
        { date: "2024-06-27", "12 Months": 380, "1 Month": 265 },
        { date: "2024-06-28", "12 Months": 370, "1 Month": 270 },
        { date: "2024-06-29", "12 Months": 360, "1 Month": 275 },
        { date: "2024-06-30", "12 Months": 350, "1 Month": 280 },
        { date: "2024-07-01", "12 Months": 340, "1 Month": 275 },
        { date: "2024-07-02", "12 Months": 330, "1 Month": 270 },
        { date: "2024-07-03", "12 Months": 320, "1 Month": 265 },
        { date: "2024-07-04", "12 Months": 310, "1 Month": 260 },
        { date: "2024-07-05", "12 Months": 300, "1 Month": 255 },
        { date: "2024-07-06", "12 Months": 290, "1 Month": 250 },
        { date: "2024-07-07", "12 Months": 280, "1 Month": 245 },
        { date: "2024-07-08", "12 Months": 270, "1 Month": 240 },
        { date: "2024-07-09", "12 Months": 260, "1 Month": 235 },
        { date: "2024-07-10", "12 Months": 250, "1 Month": 230 },
        { date: "2024-07-11", "12 Months": 240, "1 Month": 225 },
        { date: "2024-07-12", "12 Months": 230, "1 Month": 220 },
        { date: "2024-07-13", "12 Months": 220, "1 Month": 215 },
        { date: "2024-07-14", "12 Months": 210, "1 Month": 210 },
        { date: "2024-07-15", "12 Months": 220, "1 Month": 215 },
        { date: "2024-07-16", "12 Months": 230, "1 Month": 220 },
        { date: "2024-07-17", "12 Months": 240, "1 Month": 225 },
        { date: "2024-07-18", "12 Months": 250, "1 Month": 230 },
        { date: "2024-07-19", "12 Months": 260, "1 Month": 235 },
        { date: "2024-07-20", "12 Months": 270, "1 Month": 240 },
        { date: "2024-07-21", "12 Months": 280, "1 Month": 245 },
        { date: "2024-07-22", "12 Months": 290, "1 Month": 250 },
        { date: "2024-07-23", "12 Months": 300, "1 Month": 255 },
        { date: "2024-07-24", "12 Months": 310, "1 Month": 260 },
        { date: "2024-07-25", "12 Months": 320, "1 Month": 265 },
        { date: "2024-07-26", "12 Months": 330, "1 Month": 270 },
        { date: "2024-07-27", "12 Months": 340, "1 Month": 275 },
        { date: "2024-07-28", "12 Months": 350, "1 Month": 280 },
        { date: "2024-07-29", "12 Months": 360, "1 Month": 285 },
        { date: "2024-07-30", "12 Months": 370, "1 Month": 290 },
        { date: "2024-07-31", "12 Months": 380, "1 Month": 295 },
        { date: "2024-08-01", "12 Months": 390, "1 Month": 300 },
        { date: "2024-08-02", "12 Months": 400, "1 Month": 305 },
        { date: "2024-08-03", "12 Months": 410, "1 Month": 310 },
        { date: "2024-08-04", "12 Months": 420, "1 Month": 315 },
        { date: "2024-08-05", "12 Months": 430, "1 Month": 320 },
        { date: "2024-08-06", "12 Months": 440, "1 Month": 325 },
        { date: "2024-08-07", "12 Months": 450, "1 Month": 330 },
        { date: "2024-08-08", "12 Months": 460, "1 Month": 335 },
        { date: "2024-08-09", "12 Months": 470, "1 Month": 340 },
        { date: "2024-08-10", "12 Months": 480, "1 Month": 345 },
        { date: "2024-08-11", "12 Months": 490, "1 Month": 350 },
        { date: "2024-08-12", "12 Months": 500, "1 Month": 355 },
        { date: "2024-08-13", "12 Months": 490, "1 Month": 350 },
        { date: "2024-08-14", "12 Months": 480, "1 Month": 345 },
        { date: "2024-08-15", "12 Months": 470, "1 Month": 340 },
        { date: "2024-08-16", "12 Months": 460, "1 Month": 335 },
        { date: "2024-08-17", "12 Months": 450, "1 Month": 330 },
        { date: "2024-08-18", "12 Months": 440, "1 Month": 325 },
        { date: "2024-08-19", "12 Months": 430, "1 Month": 320 },
        { date: "2024-08-20", "12 Months": 420, "1 Month": 315 },
        { date: "2024-08-21", "12 Months": 410, "1 Month": 310 },
        { date: "2024-08-22", "12 Months": 400, "1 Month": 305 },
        { date: "2024-08-23", "12 Months": 390, "1 Month": 300 },
        { date: "2024-08-24", "12 Months": 380, "1 Month": 295 },
        { date: "2024-08-25", "12 Months": 370, "1 Month": 290 },
        { date: "2024-08-26", "12 Months": 360, "1 Month": 285 },
        { date: "2024-08-27", "12 Months": 350, "1 Month": 280 },
        { date: "2024-08-28", "12 Months": 340, "1 Month": 275 },
        { date: "2024-08-29", "12 Months": 330, "1 Month": 270 },
        { date: "2024-08-30", "12 Months": 320, "1 Month": 265 },
        { date: "2024-08-31", "12 Months": 310, "1 Month": 260 },
        { date: "2024-09-01", "12 Months": 300, "1 Month": 255 },
        { date: "2024-09-02", "12 Months": 290, "1 Month": 250 },
        { date: "2024-09-03", "12 Months": 280, "1 Month": 245 },
        { date: "2024-09-04", "12 Months": 270, "1 Month": 240 },
        { date: "2024-09-05", "12 Months": 260, "1 Month": 235 },
        { date: "2024-09-06", "12 Months": 250, "1 Month": 230 },
        { date: "2024-09-07", "12 Months": 240, "1 Month": 225 },
        { date: "2024-09-08", "12 Months": 230, "1 Month": 220 },
        { date: "2024-09-09", "12 Months": 220, "1 Month": 215 },
        { date: "2024-09-10", "12 Months": 210, "1 Month": 210 },
        { date: "2024-09-11", "12 Months": 220, "1 Month": 215 },
        { date: "2024-09-12", "12 Months": 230, "1 Month": 220 },
        { date: "2024-09-13", "12 Months": 240, "1 Month": 225 },
        { date: "2024-09-14", "12 Months": 250, "1 Month": 230 },
        { date: "2024-09-15", "12 Months": 260, "1 Month": 235 },
        { date: "2024-09-16", "12 Months": 270, "1 Month": 240 },
        { date: "2024-09-17", "12 Months": 280, "1 Month": 245 },
        { date: "2024-09-18", "12 Months": 290, "1 Month": 250 },
        { date: "2024-09-19", "12 Months": 300, "1 Month": 255 },
        { date: "2024-09-20", "12 Months": 310, "1 Month": 260 },
        { date: "2024-09-21", "12 Months": 320, "1 Month": 265 },
        { date: "2024-09-22", "12 Months": 330, "1 Month": 270 },
        { date: "2024-09-23", "12 Months": 340, "1 Month": 275 },
        { date: "2024-09-24", "12 Months": 350, "1 Month": 280 },
        { date: "2024-09-25", "12 Months": 360, "1 Month": 285 },
        { date: "2024-09-26", "12 Months": 370, "1 Month": 290 },
        { date: "2024-09-27", "12 Months": 380, "1 Month": 295 },
        { date: "2024-09-28", "12 Months": 390, "1 Month": 300 },
        { date: "2024-09-29", "12 Months": 400, "1 Month": 305 },
        { date: "2024-09-30", "12 Months": 410, "1 Month": 310 },
        { date: "2024-10-01", "12 Months": 420, "1 Month": 315 },
        { date: "2024-10-02", "12 Months": 430, "1 Month": 320 },
        { date: "2024-10-03", "12 Months": 440, "1 Month": 325 },
    ];

    const chartConfig = {
        twelve: {
            label: "12 Months",
            color: "hsl(var(--chart-1))",
        },
        one: {
            label: "1 Month",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    return (
        <div className="container max-w-screen-lg space-y-4">
            <h1 className="text-center text-3xl font-bold">Dashboard</h1>
            <div className="flex gap-4">
                {subStats.map((subTypeStats) => {
                    return (
                        <div
                            key={subTypeStats.name}
                            className="border-2 border-slate-300 p-4 rounded-lg flex-grow"
                        >
                            <h1 className="font-bold text-lg">
                                {subTypeStats.name}
                            </h1>
                            <div className="grid grid-cols-2">
                                <div className="flex justify-between w-4/5">
                                    <div>Total:</div>
                                    <div>{subTypeStats.total}</div>
                                </div>
                                <div className="flex justify-between w-4/5">
                                    <div>Auto-renew:</div>
                                    <div>{subTypeStats.autoRenew}</div>
                                </div>
                                <div className="flex justify-between w-4/5">
                                    <div>Active:</div>
                                    <div>{subTypeStats.active}</div>
                                </div>
                                <div className="flex justify-between w-4/5">
                                    <div>Expired:</div>
                                    <div>{subTypeStats.expired}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                <h1 className="text-center font-bold text-2xl">
                    New Subscribers
                </h1>
                <NewSubsChart data={subChartData} config={chartConfig} />
            </div>
        </div>
    );
}
