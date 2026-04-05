import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const csvUrl = process.env.GOOGLE_SHEETS_CSV_URL;
    
    // Provide a fallback if no URL so site works out of the box
    if (!csvUrl) {
      return NextResponse.json([
        {
          title: "FOUNDER'S PASS",
          description: "Full gym access, 2 personal training sessions, and custom meal plan.",
          price: "$149/mo",
          discount: "25% OFF",
          validity: "LIMITED TIME",
          image: ""
        },
        {
          title: "ELITE RANGER",
          description: "Unlimited access to all classes, recovery lounge, and priority coaching.",
          price: "$999/year",
          discount: "SAVE $400",
          validity: "ANNUAL",
          image: ""
        },
        {
          title: "SQUAD PACK",
          description: "Valid for 3+ people. Perfect for training partners and squads.",
          price: "$89/pp",
          discount: "15% OFF",
          validity: "STUDENT",
          image: ""
        }
      ]);
    }

    const res = await fetch(csvUrl, {
      next: { revalidate: 60 } // Cache API response, revalidate every 60s
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const csvText = await res.text();
    
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    if (rows.length < 2) return NextResponse.json([]);

    const headers = rows[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
    
    const offers = rows.slice(1).map((row: string) => {
      // Handles commas inside quoted CSV fields
      let inQuotes = false;
      let currentValue = '';
      const values: string[] = [];
      
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"' && (i === 0 || row[i-1] !== '\\')) {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.replace(/^"|"$/g, '').trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.replace(/^"|"$/g, '').trim());
      
      const offer: any = {};
      headers.forEach((header, i) => {
        if (header) {
          offer[header.toLowerCase()] = values[i] || '';
        }
      });
      return offer;
    });

    const validOffers = offers.filter(offer => offer.title && offer.price);

    return NextResponse.json(validOffers);
  } catch (error: any) {
    console.error('Error fetching offers:', error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}
