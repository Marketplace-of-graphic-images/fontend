import {
  aboutUsLinks, designLinks, photoLinks, videoLinks, 
} from 'constants/headerLinks';
import React, { useState } from 'react';

// Redux
import { openModalAuth, openModalRegister } from 'store';
import { useDispatch } from 'services/hooks';

// Компоненты и UI-kit 
import Logo from 'components/Logo/Logo';
import { NotificationsNo, NotificationsYes, ProfileIcon } from 'ui-lib/Icons';
import EmptyButton from 'ui-lib/Button/EmptyButton/EmptyButton';
import ButtonWithDropDown, { IButtonWithDropDown } from 'ui-lib/Button/ButtonWithDropDown/ButtonWithDropDown';
import { UniversalButton, LinkWordButton } from 'ui-lib/Button';

// Стили
import styles from './header.module.scss';

const Header = () => { 
  const dispatch = useDispatch();
  const openModal1 = () => {
    dispatch(openModalRegister());
  };
  const openModal2 = () => {
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
              {menuLinks.map((link) => <ButtonWithDropDown {...link} />)}
            </ul>
          </nav>
        </div>
        
        {isLoggedIn ? ( 
          <div className={styles.rightBlock}>
            <LinkWordButton buttonName='Войти' onClick={openModal2} />
            <UniversalButton onClick={openModal1} type='button' size='medium'>
              Создать аккаунт
            </UniversalButton>
          </div>
        ) : (
          <div className={styles.rightBlockAuthor}>
            <EmptyButton size='medium'>Загрузить публикацию</EmptyButton>
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
