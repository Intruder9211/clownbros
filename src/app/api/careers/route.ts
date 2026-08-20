import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, portfolio, track, experience, hourlyRate, availability, pitch, selectedSkills } = body;

        if (!fullName || !email || !track) {
            return NextResponse.json(
                { success: false, error: 'Full name, email, and primary skill track are required.' },
                { status: 400 }
            );
        }

        // Log submitted application for demonstration & server tracking
        console.log('--- NEW FREELANCER APPLICATION RECEIVED ---');
        console.log({
            fullName,
            email,
            portfolio,
            track,
            experience,
            hourlyRate,
            availability,
            pitch,
            selectedSkills,
            submittedAt: new Date().toISOString()
        });

        return NextResponse.json({
            success: true,
            message: 'Application received successfully! Our talent team will review your portfolio within 24-48 hours.',
            applicationId: `FL-${Math.floor(100000 + Math.random() * 900000)}`
        });
    } catch (error) {
        console.error('Error handling freelancer application:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error processing application.' },
            { status: 500 }
        );
    }
}
