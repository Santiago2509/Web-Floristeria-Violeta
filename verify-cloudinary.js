const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ekvdvbdhaubkcxiyutew.supabase.co'
const supabaseKey = 'sb_publishable_U3YzJb4aCg5VZvln28lBMg_K_Rokp-0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyCloudinary() {
  const { data, error } = await supabase
    .from('products')
    .select('title, image_url')
    .limit(1)

  if (error) {
    console.error('Error fetching from Supabase:', error)
  } else if (data && data.length > 0) {
    console.log('✅ PRODUCTO ENCONTRADO:', data[0].title)
    console.log('🔍 URL DE LA IMAGEN:', data[0].image_url)
    
    if (data[0].image_url.includes('cloudinary.com')) {
      console.log('🎉 ¡VERIFICACIÓN EXITOSA! La imagen está guardada en Cloudinary.')
    } else {
      console.log('❌ La imagen NO parece estar en Cloudinary.')
    }
  } else {
    console.log('No hay productos todavía.')
  }
}

verifyCloudinary()
