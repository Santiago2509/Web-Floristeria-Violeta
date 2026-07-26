const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ekvdvbdhaubkooiyunew.supabase.co';
const supabaseKey = 'sb_publishable_U3YzJb4aCg5VZvln28lBMg_K_Rokp-0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Probando conexión a Supabase...');
  console.log('URL:', supabaseUrl);
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ ERROR AL CONECTAR O LEER LA TABLA:', error.message);
  } else {
    console.log('✅ CONEXIÓN EXITOSA. La tabla "products" existe y se puede leer.');
    console.log('Datos obtenidos:', data);
  }
}

testConnection();
