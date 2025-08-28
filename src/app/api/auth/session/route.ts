import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
	const body = await request.json();
	const { token } = body;

	if (!token) {
		return NextResponse.json({ error: 'Token is required' }, { status: 400 });
	}

	try {
		const cookieStore = await cookies();
		cookieStore.set('firebase-session', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/',
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to set session cookie' }, { status: 500 });
	}
}

export async function DELETE() {
	try {
		const cookieStore = await cookies();
		cookieStore.delete('firebase-session');
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete session cookie' }, { status: 500 });
	}
}
