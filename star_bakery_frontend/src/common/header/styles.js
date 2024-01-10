import styled from 'styled-components'

export const NavBar = styled.nav`
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 20px 40px;
 box-shadow: 0px 10px 20px 2px #f7f3f3;;

`
export const CompanyLogo = styled.div`
display: flex;
column-gap: 10px;
`

export const Image = styled.img`
 height: 35px;
 width: 35px;
`
export const Name = styled.div`
   font-size: 32px;
   font-weight: 10px;
   opacity: 0.8

`
export const NavLink = styled.div`
 >a{
    margin-left: 30px;
    text-decoration: none;
    color: #000
 }
 a:hover{
    color: #19bae5;
 }
 a:active{
    color: #19bae5;
 }

`