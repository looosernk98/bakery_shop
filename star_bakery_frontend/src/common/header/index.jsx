import React from 'react';
import Logo from '../../constants/images/logo.png'
import * as S from './styles'

const Header = () => (
     <S.NavBar>
        <S.CompanyLogo>
            <S.Image src={Logo} alt='company_logo'/>
            <S.Name>CHEZUBA</S.Name>
        </S.CompanyLogo>
        <S.NavLink>
            <a href='/home'>Home</a>
            <a href='/dashboard'>Dashboard</a>
            <a href='/about'>About</a>
            <a href='/company'>Company</a>
            
        </S.NavLink>
     </S.NavBar>
)

export default Header;