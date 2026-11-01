import path from 'node:path'
import { Document, Page, View, Text, Image, Link, Svg, Defs, LinearGradient, Stop, Rect, Ellipse, Circle, Path, G, Font, StyleSheet } from '@react-pdf/renderer'
import type { Product } from '@/types'
import { siteConfig } from '@/lib/site-config'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { getOccasions } from '@/lib/catalog'
import type { CatalogPlan, PdfPage } from './plan'
import { PAGES_BEFORE_PRODUCTS } from './plan'
import type { PdfImage } from './images'

// ============================================================================
// CATÁLOGO PDF — páginas apaisadas 16:9 con la identidad de la web
// ============================================================================

const FONTS = path.join(process.cwd(), 'lib', 'pdf', 'fonts')
Font.register({
  family: 'Playfair',
  fonts: [
    { src: path.join(FONTS, 'playfair-display-latin-400-normal.woff') },
    { src: path.join(FONTS, 'playfair-display-latin-400-italic.woff'), fontStyle: 'italic' },
    { src: path.join(FONTS, 'playfair-display-latin-600-normal.woff'), fontWeight: 600 },
  ],
})
Font.register({
  family: 'Inter',
  fonts: [
    { src: path.join(FONTS, 'inter-latin-400-normal.woff') },
    { src: path.join(FONTS, 'inter-latin-600-normal.woff'), fontWeight: 600 },
  ],
})
Font.registerHyphenationCallback(word => [word]) // sin guiones de corte de palabra

const W = 960
const H = 540
const M = 48 // margen lateral
const TOP = 78 // inicio del contenido (bajo la cabecera)
const BOTTOM = H - 34
const CONTENT_W = W - M * 2
const CONTENT_H = BOTTOM - TOP

const C = {
  bg: '#FCFAFF',
  lavender: '#F3EAFF',
  blush: '#EFE4FF',
  ink: '#1E0B3A',
  muted: '#5B4A78',
  violet: '#6D28D9',
  plum: '#3B0764',
  fuchsia: '#A21CAF',
  gold: '#C8A24A',
  white: '#FFFFFF',
  leaf: '#6E9B76',
}

const s = StyleSheet.create({
  page: { backgroundColor: C.bg, fontFamily: 'Inter', color: C.ink },
  eyebrow: { fontFamily: 'Inter', fontWeight: 600, fontSize: 8, letterSpacing: 2.6, textTransform: 'uppercase', color: C.violet },
  name: { fontFamily: 'Playfair', fontWeight: 600, color: C.ink },
  desc: { fontSize: 8.6, lineHeight: 1.45, color: C.muted },
  price: { fontFamily: 'Inter', fontWeight: 600, color: C.violet },
})

const money = (n: number) => `$${n.toLocaleString('es-CO')}`

// Recorta textos largos sin cortar palabras
function clip(text: string, max: number) {
  const t = (text ?? '').trim().replace(/\s+/g, ' ')
  if (t.length <= max) return t
  return t.slice(0, t.lastIndexOf(' ', max)).replace(/[,.;:]$/, '') + '…'
}

const orderLink = (p: Product) => generarLinkWhatsApp(`¡Hola! Vi en el catálogo el producto *${p.title}* (${money(p.price)}). ¿Me ayudan con el pedido?`)

// ---------------------------------------------------------------------------
// Decoración vectorial
// ---------------------------------------------------------------------------

/** Violeta de cinco pétalos (dibujada en un lienzo de 60×60). */
function Violet({ size = 40, dark = C.violet, light = '#C4B5FD', rotate = 0 }: { size?: number; dark?: string; light?: string; rotate?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60">
      <G transform={`rotate(${rotate} 30 30)`}>
        <Ellipse cx="22" cy="20" rx="9" ry="13" fill={dark} transform="rotate(-28 22 20)" />
        <Ellipse cx="38" cy="20" rx="9" ry="13" fill={dark} transform="rotate(28 38 20)" />
        <Ellipse cx="16" cy="33" rx="12" ry="8" fill={light} transform="rotate(-12 16 33)" />
        <Ellipse cx="44" cy="33" rx="12" ry="8" fill={light} transform="rotate(12 44 33)" />
        <Ellipse cx="30" cy="42" rx="11" ry="12" fill={light} />
        <Circle cx="30" cy="31" r="5" fill={C.white} />
        <Circle cx="30" cy="31" r="3.2" fill="#FACC15" />
      </G>
    </Svg>
  )
}

/** Rama con hojas de corazón para las esquinas. */
function Sprig({ width = 120, color = C.leaf, stem = '#7C3AED', flip = false }: { width?: number; color?: string; stem?: string; flip?: boolean }) {
  const leaf = (x: number, y: number, r: number) => (
    <Path
      key={`${x}-${y}`}
      d="M0 0 C-3 -7 -15 -12 -10 -20 C-6 -25 -1 -23 0 -19 C1 -23 6 -25 10 -20 C15 -12 3 -7 0 0 Z"
      fill={color}
      transform={`translate(${x} ${y}) rotate(${r})`}
    />
  )
  return (
    <Svg width={width} height={width * 0.6} viewBox="0 0 200 120">
      <G transform={flip ? 'translate(200 0) scale(-1 1)' : undefined}>
        <Path d="M6 112 C50 100 90 70 120 44 C140 26 160 16 194 10" stroke={stem} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {leaf(40, 100, -40)}
        {leaf(70, 84, 130)}
        {leaf(100, 62, -30)}
        {leaf(132, 38, 140)}
        {leaf(162, 22, -20)}
      </G>
    </Svg>
  )
}

/** Fondo con degradado (ocupa todo el contenedor). */
function Gradient({ id, from, to, width, height }: { id: string; from: string; to: string; width: number; height: number }) {
  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={from} />
          <Stop offset="1" stopColor={to} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height={height} fill={`url(#${id})`} />
    </Svg>
  )
}

/** Separador con rombo, al estilo del catálogo impreso. */
function Divider({ width = 120, color = C.gold }: { width?: number; color?: string }) {
  return (
    <Svg width={width} height={8} viewBox={`0 0 ${width} 8`}>
      <Rect x="0" y="3.5" width={width / 2 - 6} height="1" fill={color} />
      <Rect x={width / 2 + 6} y="3.5" width={width / 2 - 6} height="1" fill={color} />
      <Path d={`M${width / 2} 0 L${width / 2 + 4} 4 L${width / 2} 8 L${width / 2 - 4} 4 Z`} fill={color} />
    </Svg>
  )
}

// ---------------------------------------------------------------------------
// Fotos y tarjetas de producto
// ---------------------------------------------------------------------------

function Photo({ img, width, height, arch = false, radius = 14 }: { img: PdfImage | null | undefined; width: number; height: number; arch?: boolean; radius?: number }) {
  const corners = arch
    ? { borderTopLeftRadius: width / 2, borderTopRightRadius: width / 2, borderBottomLeftRadius: radius, borderBottomRightRadius: radius }
    : { borderRadius: radius }
  if (!img) {
    return (
      <View style={{ width, height, backgroundColor: C.lavender, alignItems: 'center', justifyContent: 'center', ...corners }}>
        <Violet size={Math.min(width, height) * 0.3} />
      </View>
    )
  }
  // eslint-disable-next-line jsx-a11y/alt-text -- Image de react-pdf (no es <img> HTML)
  return <Image src={img} style={{ width, height, objectFit: 'cover', ...corners }} />
}

function Tags({ product }: { product: Product }) {
  const tags = getOccasions(product).slice(0, 3)
  if (!tags.length && !product.isFeatured) return null
  return (
    <Text style={[s.eyebrow, { fontSize: 6.8, letterSpacing: 1.6, marginBottom: 4, color: C.fuchsia }]}>
      {[product.isFeatured ? '★ Favorito' : null, ...tags].filter(Boolean).join('  ·  ')}
    </Text>
  )
}

function PriceRow({ product, size = 13 }: { product: Product; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, gap: 6 }}>
      <Text style={[s.price, { fontSize: size }]}>{money(product.price)}</Text>
      <Link src={orderLink(product)} style={{ textDecoration: 'none' }}>
        <Text style={{ fontSize: 7.5, fontWeight: 600, color: C.white, backgroundColor: C.violet, paddingVertical: 4, paddingHorizontal: 9, borderRadius: 10 }}>
          Pedir por WhatsApp ›
        </Text>
      </Link>
    </View>
  )
}

/** Foto arriba, texto abajo. */
function VerticalCard({ product, img, width, photoHeight, arch = false, nameSize = 15, descChars = 110 }: {
  product: Product; img?: PdfImage | null; width: number; photoHeight: number; arch?: boolean; nameSize?: number; descChars?: number
}) {
  return (
    <View style={{ width }}>
      <Photo img={img} width={width} height={photoHeight} arch={arch} />
      <View style={{ paddingTop: 10, paddingHorizontal: 2 }}>
        <Tags product={product} />
        <Text style={[s.name, { fontSize: nameSize, marginBottom: 4 }]}>{product.title}</Text>
        {descChars > 0 && <Text style={s.desc}>{clip(product.description, descChars)}</Text>}
        <PriceRow product={product} />
      </View>
    </View>
  )
}

/** Foto a un lado, texto al otro (tarjeta horizontal). */
function HorizontalCard({ product, img, width, height, reverse = false, descChars = 150 }: {
  product: Product; img?: PdfImage | null; width: number; height: number; reverse?: boolean; descChars?: number
}) {
  // La foto nunca ocupa más de la mitad: el texto siempre tiene espacio
  const photoW = Math.round(Math.min(height * 0.86, width * 0.5))
  return (
    <View style={{ width, height, flexDirection: reverse ? 'row-reverse' : 'row', backgroundColor: C.white, borderRadius: 16, padding: 8 }}>
      <Photo img={img} width={photoW} height={height - 16} radius={11} />
      <View style={{ flex: 1, paddingHorizontal: 16, justifyContent: 'center' }}>
        <Tags product={product} />
        <Text style={[s.name, { fontSize: 17, marginBottom: 5 }]}>{product.title}</Text>
        <Text style={s.desc}>{clip(product.description, descChars)}</Text>
        <PriceRow product={product} size={14} />
      </View>
    </View>
  )
}

// ---------------------------------------------------------------------------
// Páginas
// ---------------------------------------------------------------------------

function Header({ category, pageNumber }: { category: string; pageNumber: number }) {
  return (
    <View style={{ position: 'absolute', top: 26, left: M, right: M, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} fixed>
      <Text style={{ fontFamily: 'Playfair', fontSize: 13, letterSpacing: 4, color: C.plum }}>VIOLETA</Text>
      <Text style={{ fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 15, color: C.violet }}>{category}</Text>
      <Text style={{ fontSize: 8, color: C.muted, letterSpacing: 1.5 }}>{String(pageNumber).padStart(2, '0')}</Text>
    </View>
  )
}

function Corners() {
  return (
    <>
      <View style={{ position: 'absolute', right: -6, bottom: -4, opacity: 0.85 }}><Sprig width={150} flip /></View>
      <View style={{ position: 'absolute', right: 96, bottom: 6 }}><Violet size={26} rotate={-15} /></View>
    </>
  )
}

function OpenerPage({ page, images, pageNumber }: { page: PdfPage; images: Map<string, PdfImage | null>; pageNumber: number }) {
  const panelW = 300
  const area = W - panelW - M - 40
  return (
    <Page size={[W, H]} style={s.page} id={`cat-${pageNumber}`}>
      {/* Panel de la categoría */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: panelW, height: H, overflow: 'hidden' }}>
        <Gradient id={`op-${pageNumber}`} from={C.plum} to={C.violet} width={panelW} height={H} />
        <View style={{ position: 'absolute', top: 40, left: 40, right: 30 }}>
          <Text style={{ fontFamily: 'Playfair', fontSize: 12, letterSpacing: 4, color: '#E9D5FF' }}>VIOLETA</Text>
        </View>
        <View style={{ position: 'absolute', top: 170, left: 40, right: 30 }}>
          <Text style={[s.eyebrow, { color: '#E9D5FF', marginBottom: 10 }]}>Categoría</Text>
          <Text style={{ fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 44, lineHeight: 1.05, color: C.white, marginBottom: 16 }}>{page.category}</Text>
          <Divider width={110} />
          <Text style={{ fontSize: 10, color: '#E9D5FF', marginTop: 14 }}>
            {page.categoryCount} {page.categoryCount === 1 ? 'diseño' : 'diseños'} hechos a mano
          </Text>
        </View>
        <View style={{ position: 'absolute', left: -10, bottom: -6 }}><Sprig width={210} color="#8FB998" stem="#E9D5FF" /></View>
        <View style={{ position: 'absolute', left: 180, bottom: 70 }}><Violet size={34} light="#F0ABFC" rotate={12} /></View>
        <View style={{ position: 'absolute', left: 232, bottom: 110 }}><Violet size={22} light="#E9D5FF" rotate={-20} /></View>
      </View>

      <Text style={{ position: 'absolute', top: 30, right: M, fontSize: 8, color: C.muted, letterSpacing: 1.5 }}>{String(pageNumber).padStart(2, '0')}</Text>

      {/* Productos */}
      <View style={{ position: 'absolute', top: 70, left: panelW + 40, width: area, height: CONTENT_H + 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {page.products.length === 1 ? (
          <HorizontalCard product={page.products[0]} img={images.get(page.products[0].imageUrl)} width={area} height={330} descChars={260} />
        ) : (
          page.products.map((p, i) => (
            <VerticalCard key={p.id} product={p} img={images.get(p.imageUrl)} width={(area - 24) / 2} photoHeight={i === 0 ? 300 : 270} arch={i === 0} nameSize={17} descChars={120} />
          ))
        )}
      </View>
    </Page>
  )
}

function ProductPage({ page, images, pageNumber }: { page: PdfPage; images: Map<string, PdfImage | null>; pageNumber: number }) {
  const img = (p: Product) => images.get(p.imageUrl)
  const [a, b, c, d] = page.products
  let body: React.ReactNode = null

  if (page.layout === 'hero' || page.layout === 'hero-r') {
    const bigW = 360
    const colW = CONTENT_W - bigW - 28
    const big = <VerticalCard product={a} img={img(a)} width={bigW} photoHeight={300} arch nameSize={19} descChars={120} />
    const stack = (
      <View style={{ width: colW, justifyContent: 'space-between', height: CONTENT_H }}>
        {[b, c].filter(Boolean).map((p, i) => (
          <HorizontalCard key={p.id} product={p} img={img(p)} width={colW} height={(CONTENT_H - 18) / 2} reverse={page.layout === 'hero-r' ? i === 0 : i === 1} />
        ))}
      </View>
    )
    body = page.layout === 'hero' ? <>{big}{stack}</> : <>{stack}{big}</>
  } else if (page.layout === 'four') {
    const cardW = (CONTENT_W - 3 * 22) / 4
    body = [a, b, c, d].filter(Boolean).map((p, i) => (
      <View key={p.id} style={{ marginTop: i % 2 === 0 ? 0 : 26 }}>
        <VerticalCard product={p} img={img(p)} width={cardW} photoHeight={i % 2 === 0 ? 262 : 236} arch={i % 2 === 0} nameSize={13.5} descChars={70} />
      </View>
    ))
  } else if (page.layout === 'two') {
    const cardW = (CONTENT_W - 28) / 2
    body = [a, b].map((p, i) => (
      <HorizontalCard key={p.id} product={p} img={img(p)} width={cardW} height={CONTENT_H - 40} reverse={i === 1} descChars={200} />
    ))
  } else {
    // 'one': producto protagonista
    body = (
      <>
        <Photo img={img(a)} width={360} height={CONTENT_H} arch />
        <View style={{ width: CONTENT_W - 400, justifyContent: 'center' }}>
          <Tags product={a} />
          <Text style={[s.name, { fontSize: 34, marginBottom: 12 }]}>{a.title}</Text>
          <Divider width={120} />
          <Text style={[s.desc, { fontSize: 11, marginTop: 14 }]}>{clip(a.description, 420)}</Text>
          <View style={{ width: 260 }}><PriceRow product={a} size={20} /></View>
        </View>
      </>
    )
  }

  return (
    <Page size={[W, H]} style={s.page}>
      <Header category={page.category} pageNumber={pageNumber} />
      <View style={{ position: 'absolute', top: 58, left: M, right: M, height: 1, backgroundColor: C.blush }} />
      <View style={{ position: 'absolute', top: TOP, left: M, width: CONTENT_W, height: CONTENT_H, flexDirection: 'row', justifyContent: 'space-between', alignItems: page.layout === 'four' ? 'flex-start' : 'stretch' }}>
        {body}
      </View>
      {page.layout !== 'hero' && <Corners />}
    </Page>
  )
}

function CoverPage({ title, subtitle, img }: { title: string; subtitle: string; img?: PdfImage | null }) {
  return (
    <Page size={[W, H]} style={s.page}>
      <Gradient id="cover" from={C.plum} to="#5B21B6" width={W} height={H} />
      {/* marco fino dorado */}
      <View style={{ position: 'absolute', top: 18, left: 18, right: 18, bottom: 18, borderWidth: 0.8, borderColor: C.gold, opacity: 0.7 }} />

      <View style={{ position: 'absolute', top: 120, left: 80, width: 470, alignItems: 'center' }}>
        <Text style={{ fontSize: 13, letterSpacing: 8, color: '#E9D5FF', marginBottom: 6 }}>FLORISTERÍA</Text>
        <Text style={{ fontFamily: 'Playfair', fontSize: 92, color: C.white, lineHeight: 1 }}>Violeta</Text>
        <View style={{ marginVertical: 26 }}><Divider width={200} /></View>
        <Text style={{ fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 34, color: C.white, textAlign: 'center' }}>{title}</Text>
        {subtitle ? <Text style={{ fontSize: 11, letterSpacing: 4, color: '#E9D5FF', marginTop: 12, textTransform: 'uppercase', textAlign: 'center' }}>{subtitle}</Text> : null}
      </View>
      <Text style={{ position: 'absolute', bottom: 46, left: 80, width: 470, textAlign: 'center', fontSize: 9, letterSpacing: 3, color: '#C4B5FD' }}>
        CALI, COLOMBIA  ·  {siteConfig.url.replace(/^https?:\/\//, '').toUpperCase()}
      </Text>

      {/* foto en arco con marco desplazado */}
      <View style={{ position: 'absolute', top: 64, right: 86, width: 300, height: 412, borderWidth: 0.8, borderColor: C.gold, borderTopLeftRadius: 150, borderTopRightRadius: 150, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }} />
      <View style={{ position: 'absolute', top: 50, right: 100 }}>
        <Photo img={img} width={300} height={412} arch />
      </View>

      <View style={{ position: 'absolute', left: 30, bottom: 26 }}><Sprig width={170} color="#8FB998" stem="#C4B5FD" /></View>
      <View style={{ position: 'absolute', right: 60, top: 430 }}><Violet size={54} light="#F0ABFC" rotate={-10} /></View>
      <View style={{ position: 'absolute', right: 380, top: 46 }}><Violet size={30} light="#E9D5FF" rotate={18} /></View>
    </Page>
  )
}

function IndexPage({ plan }: { plan: CatalogPlan }) {
  return (
    <Page size={[W, H]} style={s.page}>
      <View style={{ position: 'absolute', top: 0, right: 0, width: 400, height: H, backgroundColor: C.lavender }} />
      <View style={{ position: 'absolute', top: 96, left: 80, width: 380 }}>
        <Text style={[s.eyebrow, { marginBottom: 12 }]}>Bienvenida</Text>
        <Text style={{ fontFamily: 'Playfair', fontSize: 38, lineHeight: 1.1, color: C.ink, marginBottom: 18 }}>
          Flores que dicen <Text style={{ fontStyle: 'italic', color: C.violet }}>lo que sientes</Text>
        </Text>
        <Divider width={110} />
        <Text style={[s.desc, { fontSize: 11, marginTop: 18 }]}>
          Cada pieza se arma a mano en Cali, con flores frescas seleccionadas una a una por su tamaño, su color y su frescura.
        </Text>
        <Text style={[s.desc, { fontSize: 11, marginTop: 10 }]}>
          Toca «Pedir por WhatsApp» en cualquier producto y te atendemos al instante.
        </Text>
        <Text style={{ fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 13, color: C.fuchsia, marginTop: 18 }}>
          Tú eliges el detalle. Nosotros nos encargamos de que llegue perfecto.
        </Text>
      </View>

      <View style={{ position: 'absolute', top: 96, right: 64, width: 290 }}>
        <Text style={[s.eyebrow, { marginBottom: 18 }]}>Contenido</Text>
        {plan.sections.map(sec => (
          <Link key={sec.category} src={`#cat-${sec.firstPage}`} style={{ textDecoration: 'none' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 14 }}>
              <Text style={{ fontFamily: 'Playfair', fontSize: 18, color: C.ink }}>{sec.category}</Text>
              <Text style={{ fontSize: 8, color: C.muted, marginLeft: 6, marginBottom: 3 }}>({sec.products.length})</Text>
              <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#D8C8F2', borderStyle: 'dotted', marginHorizontal: 8, marginBottom: 5 }} />
              <Text style={{ fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 15, color: C.violet }}>{String(sec.firstPage).padStart(2, '0')}</Text>
            </View>
          </Link>
        ))}
      </View>
      <View style={{ position: 'absolute', left: 20, bottom: 10 }}><Sprig width={150} /></View>
      <View style={{ position: 'absolute', left: 160, bottom: 40 }}><Violet size={30} rotate={-12} /></View>
    </Page>
  )
}

function BackCover({ qr }: { qr: string }) {
  return (
    <Page size={[W, H]} style={s.page}>
      <Gradient id="back" from="#5B21B6" to={C.plum} width={W} height={H} />
      <View style={{ position: 'absolute', top: 18, left: 18, right: 18, bottom: 18, borderWidth: 0.8, borderColor: C.gold, opacity: 0.7 }} />

      <View style={{ position: 'absolute', top: 110, left: 90, width: 470 }}>
        <Text style={[s.eyebrow, { color: '#E9D5FF', marginBottom: 12 }]}>Haz tu pedido</Text>
        <Text style={{ fontFamily: 'Playfair', fontSize: 44, lineHeight: 1.08, color: C.white, marginBottom: 20 }}>
          ¿Listo para <Text style={{ fontStyle: 'italic', color: '#F0ABFC' }}>sorprender?</Text>
        </Text>
        <Divider width={120} />
        <View style={{ marginTop: 22 }}>
          {[
            ['WhatsApp', siteConfig.phoneDisplay],
            ['Dirección', `${siteConfig.address.street}, ${siteConfig.address.city}`],
            ...siteConfig.hours.map(h => [h.days, h.time]),
            ['Instagram', '@floristeriavioleta28'],
          ].map(([label, value]) => (
            <View key={label} style={{ flexDirection: 'row', marginBottom: 7 }}>
              <Text style={{ width: 110, fontSize: 8, letterSpacing: 1.8, color: '#C4B5FD', textTransform: 'uppercase', paddingTop: 1.5 }}>{label}</Text>
              <Text style={{ flex: 1, fontSize: 10.5, color: C.white }}>{value}</Text>
            </View>
          ))}
        </View>
        <Link src={generarLinkWhatsApp('¡Hola! Vi el catálogo y quiero hacer un pedido.')} style={{ textDecoration: 'none', marginTop: 18 }}>
          <Text style={{ alignSelf: 'flex-start', fontSize: 11, fontWeight: 600, color: C.plum, backgroundColor: C.white, paddingVertical: 8, paddingHorizontal: 18, borderRadius: 16 }}>
            Escríbenos por WhatsApp ›
          </Text>
        </Link>
      </View>

      <View style={{ position: 'absolute', top: 120, right: 110, alignItems: 'center' }}>
        <View style={{ backgroundColor: C.white, padding: 14, borderRadius: 18 }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- Image de react-pdf */}
          <Image src={qr} style={{ width: 170, height: 170 }} />
        </View>
        <Text style={{ fontSize: 9, color: '#E9D5FF', marginTop: 12, letterSpacing: 1 }}>Escanea y mira el catálogo en línea</Text>
      </View>

      <View style={{ position: 'absolute', right: 20, bottom: 18 }}><Sprig width={190} color="#8FB998" stem="#C4B5FD" flip /></View>
      <View style={{ position: 'absolute', right: 210, bottom: 60 }}><Violet size={40} light="#F0ABFC" /></View>
      <Text style={{ position: 'absolute', bottom: 40, left: 90, fontFamily: 'Playfair', fontSize: 22, letterSpacing: 6, color: '#E9D5FF' }}>VIOLETA</Text>
    </Page>
  )
}

export function CatalogDocument({ plan, images, title, subtitle, qr }: {
  plan: CatalogPlan
  images: Map<string, PdfImage | null>
  title: string
  subtitle: string
  qr: string
}) {
  return (
    <Document title={`${title} — Floristería Violeta`} author="Floristería Violeta" subject="Catálogo de productos" language="es">
      <CoverPage title={title} subtitle={subtitle} img={plan.coverProduct ? images.get(plan.coverProduct.imageUrl) : null} />
      <IndexPage plan={plan} />
      {plan.pages.map((page, i) => {
        const pageNumber = PAGES_BEFORE_PRODUCTS + i + 1
        return page.layout === 'opener'
          ? <OpenerPage key={i} page={page} images={images} pageNumber={pageNumber} />
          : <ProductPage key={i} page={page} images={images} pageNumber={pageNumber} />
      })}
      <BackCover qr={qr} />
    </Document>
  )
}
