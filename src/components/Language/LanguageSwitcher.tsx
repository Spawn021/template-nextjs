'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setLocale } from '@/store/redux/slices/languageSlice'
import { RootState } from '@/store/redux/store'
import { useRouter, usePathname } from 'next/navigation'
import VietNamFlag from '@/resources/images/vietnam.png'
import EnglishFlag from '@/resources/images/united-kingdom.png'
import Internet from '@/resources/images/internet.png'
import Check from '@/resources/images/check.png'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const locale = useSelector((state: RootState) => state.language.locale)
  const handleChangeLanguage = () => {
    const newLocale = locale === 'en' ? 'vi' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)

    dispatch(setLocale(newLocale))
    router.replace(newPath)
  }
  const currentLocale = pathname.split('/')[1]
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer">
          <Image src={Internet} alt="Choose language" className="w-6 h-6"></Image>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="change language"
        onAction={handleChangeLanguage}
        variant="faded"
      >
        <DropdownItem
          key="english"
          startContent={
            <Image
              src={EnglishFlag}
              alt="English flag"
              className="text-xl text-default-500 pointer-events-none flex-shrink-0 w-4 h-4"
            />
          }
          endContent={
            currentLocale === 'en' && (
              <Image
                src={Check}
                alt="check"
                className="text-xl text-default-500 pointer-events-none flex-shrink-0 w-4 h-4"
              />
            )
          }
        >
          English
        </DropdownItem>
        <DropdownItem
          key="vietnam"
          startContent={
            <Image
              src={VietNamFlag}
              alt="English flag"
              className="text-xl text-default-500 pointer-events-none flex-shrink-0 w-4 h-4"
            />
          }
          endContent={
            currentLocale === 'vi' && (
              <Image
                src={Check}
                alt="check"
                className="text-xl text-default-500 pointer-events-none flex-shrink-0 w-4 h-4"
              />
            )
          }
        >
          VietNam
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

//   return (
//     <button onClick={handleChangeLanguage} className="p-2 border rounded">
//       {locale === 'en' ? 'vi VietNam' : '🇺🇸 English'}
//     </button>
//   )
// }
