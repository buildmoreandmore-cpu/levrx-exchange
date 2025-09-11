const { PrismaClient } = require('@prisma/client')

async function testConnection() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔄 Testing database connection...')
    
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database connection successful:', result)
    
    // Test if tables exist
    const userCount = await prisma.user.count()
    console.log(`✅ Found ${userCount} users in database`)
    
    const listingCount = await prisma.listing.count()
    console.log(`✅ Found ${listingCount} listings in database`)
    
    console.log('🎉 Database is fully connected and operational!')
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()