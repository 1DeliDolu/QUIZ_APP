type Props = { title: string }

export default function SectionPage({ title }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-600">(placeholder) İçerik ve übung listesi burada gösterilecek.</p>
    </div>
  )
}

