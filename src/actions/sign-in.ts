'use server'
import * as auth from '@/auth'

export async function signInWithGitHub() {
    await auth.signIn('github')
}
