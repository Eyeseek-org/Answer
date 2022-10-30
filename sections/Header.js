import { useState, useEffect } from "react"
import { useMoralis } from "react-moralis";

import Link from "next/link"
import Image from "next/image"
import styled from "styled-components"
import axios from 'axios'
import {useAccount} from 'wagmi'

import Logo from "../public/Logo.png"
import Rainbow from '../components/buttons/Rainbow'
import Notifications from '../sections/Notifications'
import { BellIcon } from "../components/icons/Landing";

const NavItem = styled.div`
  display: flex;
  font-size: 1.6em;
  font-family: "Gemunu Libre", sans-serif;
  font-style: normal;
  align-items: center;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1em;
    flex-wrap: wrap;
  }
`

const HeadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  color: #b0f6ff;
  padding: 10px 50px;
  margin-bottom: 3%;
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const ImageBox = styled.div`
  display: block;
  @media (max-width: 768px) {
    font-size: 0.8em;
    flex-wrap: wrap;
    padding-right: 10%;
    right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;

  @media (max-width: 960px) {
    padding: 0;
    flex-wrap: wrap;
    display: none;
  }
`

const ConnectBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`

const A = styled.div`
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

const AB = styled(A)`
  font-weight: bold;
`

const IconFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid white;
  padding: 4px;
  border-radius: 5px;
  &:hover{
    cursor: pointer;
  }
`

const Notis = styled.div`
  position: absolute;
  color: white;
  text-align: center;
  align-items: center;
  width: 17px;
  height: 17px;
  border-radius: 15px;
  background: #ab0000;
  right: -10%;
  top: -20%;
`

const Header = () => {
  const [active, setActive] = useState("Home")
  const [noti, setNoti] = useState(false)
  const [notis, setNotis] = useState([])
  const [notiNumber, setNotiNumber] = useState(notis.length)
  const { isAuthenticated } = useMoralis();
  const {address} = useAccount()
  const header = [
    { title: "Discover", url: "" },
    { title: "Start a project", url: "/startproject" },
    { title: "FAQ", url: "/faq" },
    { title: "My projects", url: "/my" },
  ]

  const moralisApiConfig = {
    headers: {
      "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
      "Content-Type": "application/json"
    }
  }

  const getData = async () => {
      try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification?where={"user":"${address}"}`, moralisApiConfig);
          await setNotis(res.data.results.slice(0,20));
          await setNotiNumber(notis.length)
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getData()
  },[])

  return (
    <>
      <HeadBox>
        <ImageBox>
          <NavItem
            onClick={() => {
              setActive("Home")
            }}
          >
            <Link href="/">
              <A>
                <Image src={Logo} alt="Logo" width={"110%"} height={"50%"} />
              </A>
            </Link>
          </NavItem>
        </ImageBox>

        <MenuBox>
          {header.map((h, index) => {
            const { title, url } = h

            return (
              <NavItem
                key={index}
                onClick={() => {
                  setActive(title)
                }}
              >
                {active === title ? (
                  <Link href={url}>
                    <AB>{title}</AB>
                  </Link>
                ) : (
                  <Link href={url}>
                    <A>{title}</A>
                  </Link>
                )}
              </NavItem>
            )
          })}
        </MenuBox>

        <ConnectBox>
          <Rainbow />
          {isAuthenticated && <IconFrame onClick={() => { setNoti(!noti) }}>
          <BellIcon/>
            {notis > 0 && <Notis>{notiNumber}</Notis>}
          </IconFrame>}
        </ConnectBox>
        {noti && <Notifications notis={notis} />}
      </HeadBox>
    </>
  )
}

export default Header
