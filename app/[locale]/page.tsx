import { useTranslations } from 'next-intl'
export default function Home() {
  const t = useTranslations('HomePage')
  return <div className="">Hello World {t('title')}haha</div>
}
