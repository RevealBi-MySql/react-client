import { GlobalContext, useGlobalState } from './hooks/context-hooks';
import { IgrIconButton, IgrIconButtonModule, IgrNavbar, IgrNavbarModule, IgrNavDrawer, IgrNavDrawerItem, IgrNavDrawerModule, IgrRipple, IgrRippleModule } from 'igniteui-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import styles from './app.module.css';
import createClassTransformer from './style-utils';

IgrIconButtonModule.register();
IgrNavbarModule.register();
IgrNavDrawerModule.register();
IgrRippleModule.register();

export default function App() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const navigate = useNavigate();
  const navDrawer = useRef<IgrNavDrawer>(null);
  const { globalState, setGlobalState } = useGlobalState();

  return (
    <GlobalContext.Provider value ={{ globalState, setGlobalState}}>
      <div className={classes("column-layout master-view-container")}>
        <IgrNavbar className={classes("navbar")}>
          <div style={{display: 'contents'}} slot="start" key={uuid()}>
            <IgrIconButton variant="flat" clicked={() => navDrawer?.current?.toggle()}>
              <span className={classes("material-icons")} key={uuid()}>
                <span key={uuid()}>menu</span>
              </span>
              <IgrRipple key={uuid()}></IgrRipple>
            </IgrIconButton>
          </div>
          <div className={classes("row-layout group")} key={uuid()}>
            <div className={classes("row-layout group_1")}>
              <img src="https://static.infragistics.com/marketing/reveal/business-teams-reveal-logo-black.svg" className={classes("image")} />
              <p className={classes("typography__subtitle-2 text")}>
                <span>|</span>
              </p>
              <p className={classes("typography__subtitle-2 text_1")}>
                <span>PoC Kickoff Sample</span>
              </p>
            </div>
          </div>
        </IgrNavbar>
        <div className={classes("row-layout group_2")}>
          <IgrNavDrawer open="true" position="relative" ref={navDrawer} className={classes("nav-drawer")}>
            <div style={{display: 'contents'}} onClick={() => navigate(`/viewer`)} key={uuid()}>
              <IgrNavDrawerItem>
                <div slot="content" key={uuid()}>Dashboard Viewer</div>
              </IgrNavDrawerItem>
            </div>
            <div style={{display: 'contents'}} onClick={() => navigate(`/editor`)} key={uuid()}>
              <IgrNavDrawerItem>
                <div slot="content" key={uuid()}>New Dashboard</div>
              </IgrNavDrawerItem>
            </div>
          </IgrNavDrawer>
          <div className={classes("view-container")}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}
