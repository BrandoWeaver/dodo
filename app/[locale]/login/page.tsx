import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex flex-row w-full">
      <Image
        alt="login"
        width={800}
        height={800}
        src={'/login/login.png'}
        className="w-full"
      ></Image>
      <Image
        alt="login"
        width={800}
        height={800}
        src={'/login/login.png'}
        className="w-full"
      ></Image>
    </div>
  )
}
