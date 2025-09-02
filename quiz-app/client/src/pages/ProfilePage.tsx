import { useAuthStore } from '../store/auth'

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)

  if (!user) {
    return <div>Bitte einloggen, um Profil zu sehen.</div>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Profil</h1>
      <div className="rounded border p-4">
        <div><span className="font-medium">Name:</span> {user.name}</div>
        <div><span className="font-medium">Email:</span> {user.email}</div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <section className="border rounded p-4">
          <h2 className="font-medium mb-2">Yaptığı Testler</h2>
          <p className="text-sm text-gray-600">(placeholder) Kullanıcının çözdüğü übunglar listelenecek.</p>
        </section>
        <section className="border rounded p-4">
          <h2 className="font-medium mb-2">Yaptığı Hatalar</h2>
          <p className="text-sm text-gray-600">(placeholder) Yanlışlar ve tekrar planı gösterilecek.</p>
        </section>
        <section className="border rounded p-4">
          <h2 className="font-medium mb-2">Başarılı Bölümler</h2>
          <p className="text-sm text-gray-600">(placeholder) Tamamlanan bölümler/sınavlar listelenecek.</p>
        </section>
      </div>
    </div>
  )
}

