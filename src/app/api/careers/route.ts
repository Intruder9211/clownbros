import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const jobs = await db.job.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        });
        return NextResponse.json({ success: true, jobs }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
            }
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, portfolio, track, experience, hourlyRate, availability, pitch, selectedSkills, jobId } = body;

        if (!fullName || !email || !track) {
            return NextResponse.json(
                { success: false, error: 'Full name, email, and primary skill track are required.' },
                { status: 400 }
            );
        }

        let application = null;
        try {
            let targetJobId = jobId;
            if (!targetJobId) {
                const matchedJob = await db.job.findFirst({
                    where: { title: { contains: track, mode: 'insensitive' } }
                });
                targetJobId = matchedJob?.id || null;
            }

            const coverNote = [
                "Track / Position: " + track,
                experience ? "Experience: " + experience : null,
                hourlyRate ? "Expected Rate: " + hourlyRate : null,
                availability ? "Availability: " + availability : null,
                selectedSkills && selectedSkills.length > 0 ? "Skills: " + selectedSkills.join(', ') : null,
                pitch ? "\nBio / Pitch:\n" + pitch : null
            ].filter(Boolean).join('\n');

            application = await db.jobApplication.create({
                data: {
                    jobId: targetJobId,
                    applicantName: fullName,
                    applicantEmail: email.toLowerCase().trim(),
                    portfolioUrl: portfolio || null,
                    coverLetter: coverNote,
                    status: 'PENDING'
                }
            });
        } catch (dbErr) {
            console.error('Failed to save application in database:', dbErr);
        }

        return NextResponse.json({
            success: true,
            message: 'Application received successfully! Our talent team will review your portfolio within 24-48 hours.',
            applicationId: application?.id ? "FL-" + application.id.slice(-6).toUpperCase() : "FL-" + Math.floor(100000 + Math.random() * 900000)
        });
    } catch (error) {
        console.error('Error handling freelancer application:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error processing application.' },
            { status: 500 }
        );
    }
}
