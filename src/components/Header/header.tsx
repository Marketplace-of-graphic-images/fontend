import {
  aboutUsLinks, designLinks, photoLinks, videoLinks, 
} from 'constants/headerLinks';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Redux
import { openModalAuth, openModalRegister } from 'store';
import { useDispatch } from 'services/hooks';

// Компоненты и UI-kit 
import { NotificationsNo, NotificationsYes, ProfileIcon } from 'ui-lib/Icons';
import ButtonWithDropDown, { IButtonWithDropDown } from 'ui-lib/Button/ButtonWithDropDown/ButtonWithDropDown';
import { UniversalButton, LinkWordButton } from 'ui-lib/Button';
import Logo from './components/Logo/Logo';

// Стили
import styles from './header.module.scss';

const Header = () => { 
  const dispatch = useDispatch();
  const openRgisterModal = () => {
    dispatch(openModalRegister());
  };
  const openAuthModal = () => {
    dispatch(openModalAuth());
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notificationsState, setNotificationsState] = useState(false);

  const menuLinks: IButtonWithDropDown[] = [
    {
      title: 'Фотографии',
      menuItem: photoLinks,
    },
    {
      title: 'Дизайн',
      menuItem: designLinks,
    },
    {
      title: 'Видео',
      menuItem: videoLinks,
    },
    {
      title: 'О нас',
      menuItem: aboutUsLinks,
    }];

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.leftBlock}>
          <Logo />

          <nav>
            <ul className={styles.menu}>      
              {menuLinks.map((link) => <ButtonWithDropDown key={uuidv4()} {...link} />)}
            </ul>
          </nav>
        </div>
        
        {isLoggedIn ? ( 
          <div className={styles.rightBlock}> 
            <LinkWordButton buttonName='Войти' onClick={openAuthModal} />
            <UniversalButton onClick={openRgisterModal} type='button' width='174' height='47'>
              Создать аккаунт
            </UniversalButton>
          </div>
        ) : (
          <div className={styles.rightBlockAuthor}>
            <UniversalButton isFilled={false} type='button' width='208' height='47'>Загрузить работу</UniversalButton>
            {notificationsState
              ? (<NotificationsYes width='40' height='40' />)
              : (<NotificationsNo width='40' height='40' />)}
            <ProfileIcon className={styles.icon} width='40' height='40' />
          </div>
        )}

      </div>
    </header>
  );
};
export default Header;
