import { useGlobalContext } from '../hooks/context-hooks';
import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { useEffect, useState } from 'react';
import { useGetDashboardNamesList } from '../hooks/reveal-server-hooks';
import styles from './viewer.module.css';
import createClassTransformer from '../style-utils';

IgrComboModule.register();
declare var $: any;

export default function Viewer() {
  const classes = createClassTransformer(styles);
  const { revealServerDashboardNames } = useGetDashboardNamesList();
  const [selectedDashboard, setSelectedDashboard] = useState<string | undefined>();

  function singleSelectComboChange(_: IgrCombo, event: any) {
    setSelectedDashboard(event.detail.newValue[0] as string);
  }

  useEffect(() => {
    if (revealServerDashboardNames && revealServerDashboardNames.length > 0) {
      setSelectedDashboard(revealServerDashboardNames[0].dashboardFileName);
    }
  }, [revealServerDashboardNames]);

  useEffect(() => {
    if (selectedDashboard) {
      $.ig.RVDashboard.loadDashboard(selectedDashboard).then((dashboard: any) => {
        var revealView = new $.ig.RevealView('#revealView');
        revealView.dashboard = dashboard;
      });
    }
  }, [selectedDashboard]);

  return (
    <>
      <div className={classes("column-layout viewer-container")}>
        <div className={classes("column-layout group")}>
          <div className={classes("row-layout group_1")}>
            <p className={classes("typography__body-1 text")}>
              <span>Select a dashboard to view / edit</span>
            </p>
            <IgrCombo
              outlined="true"
              data={revealServerDashboardNames}
              valueKey="dashboardFileName"
              displayKey="dashboardTitle"
              value={selectedDashboard ? [selectedDashboard] : []}
              singleSelect="true"
              change={(s, event) => singleSelectComboChange(s, event)}
              selectedItem={selectedDashboard} 
              className={classes("single-select-combo")}
            ></IgrCombo>
          </div>
        </div>
        <div className={classes("column-layout group_2")}>
          <div className={classes("group_3")}>
            <div id='revealView' style={{ height: 'calc(100vh - 140px)', width: '100%', position: 'relative' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
