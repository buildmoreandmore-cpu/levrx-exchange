import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()

    // Validate required fields
    const requiredFields = ['userType', 'businessDescription', 'yearsExperience', 'monthlyDealsVolume', 'investmentRange', 'focusAreas', 'referralSource']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Ensure user exists in database (create if not)
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!existingUser) {
      // Create user first if they don't exist
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress || '',
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || null,
        }
      })
    }

    // Parse years of experience into numeric value
    let yearsExperienceNumeric = 0
    switch (data.yearsExperience) {
      case '0-1':
        yearsExperienceNumeric = 1
        break
      case '2-5':
        yearsExperienceNumeric = 3
        break
      case '5-10':
        yearsExperienceNumeric = 7
        break
      case '10+':
        yearsExperienceNumeric = 15
        break
    }

    // Parse monthly deals volume into numeric value
    let monthlyDealsVolumeNumeric = 0
    switch (data.monthlyDealsVolume) {
      case '0':
        monthlyDealsVolumeNumeric = 0
        break
      case '1-3':
        monthlyDealsVolumeNumeric = 2
        break
      case '4-10':
        monthlyDealsVolumeNumeric = 7
        break
      case '10+':
        monthlyDealsVolumeNumeric = 15
        break
    }

    // Update user with onboarding data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        onboardingCompleted: true,
        userType: data.userType,
        businessDescription: data.businessDescription,
        yearsExperience: yearsExperienceNumeric,
        monthlyDealsVolume: monthlyDealsVolumeNumeric,
        investmentRange: data.investmentRange,
        focusAreas: data.focusAreas,
        linkedInProfile: data.linkedInProfile || null,
        companyWebsite: data.companyWebsite || null,
        phoneNumber: data.phoneNumber || null,
        referralSource: data.referralSource
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        userType: updatedUser.userType,
        onboardingCompleted: updatedUser.onboardingCompleted
      }
    })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save onboarding data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        onboardingCompleted: true,
        userType: true,
        businessDescription: true,
        yearsExperience: true,
        monthlyDealsVolume: true,
        investmentRange: true,
        focusAreas: true,
        linkedInProfile: true,
        companyWebsite: true,
        phoneNumber: true,
        referralSource: true
      }
    })

    if (!dbUser) {
      return NextResponse.json({
        success: true,
        onboardingCompleted: false
      })
    }

    return NextResponse.json({
      success: true,
      onboardingCompleted: dbUser.onboardingCompleted,
      userData: dbUser
    })
  } catch (error) {
    console.error('Error fetching onboarding status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch onboarding status' },
      { status: 500 }
    )
  }
}