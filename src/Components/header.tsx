import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import HeaderAuth from './header-auth';
import SearchInput from './search-input';
import { Suspense } from 'react';
export default async function Header() {


  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense fallback={<div>loadin......</div>}>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end"><HeaderAuth/></NavbarContent>
    </Navbar>
  );
}
