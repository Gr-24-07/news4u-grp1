"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="text-sm text-right mr-10 mt-2">
            <p>
               {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    
                })}
            </p>
        </div>
    );
}
