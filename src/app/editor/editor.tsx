import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { useEffect, useState } from 'react';
import { useGetEmployees } from '../hooks/northwind-hooks';
import styles from './editor.module.css';
import createClassTransformer from '../style-utils';

IgrComboModule.register();
declare var $: any;

export default function Editor() {
  const classes = createClassTransformer(styles);
  const [_selectedEmployee, setSelectedEmployee] = useState<number | undefined>();
  const { northwindEmployees } = useGetEmployees();

  function singleSelectComboChange(_: IgrCombo, event: any) {
    const selectedEmployee = event.detail.newValue[0];
    if (selectedEmployee) {
      setSelectedEmployee(selectedEmployee);
      console.log('Selected Employee ID:', selectedEmployee);
    } else {
      console.log('No employee selected or invalid selection');
    }
  }
  
  useEffect(() => {
    $.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");
    const headers = {};
  
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url: any) {
      headers["x-header-one"] = _selectedEmployee;
      return headers;
    });
  
    const revealView = new $.ig.RevealView('#revealView');
    revealView.startInEditMode = true;
  
    revealView.onDataSourcesRequested = (callback: any) => {
      const sqlDs = new $.ig.RVMySqlDataSource();
      sqlDs.id = "sqlServer";
      sqlDs.title = "MySql Server Data Source";
      sqlDs.subtitle = "Full Northwind Database";
  
      const dsi1 = new $.ig.RVMySqlDataSourceItem(sqlDs);
      dsi1.id = "customer_orders";
      dsi1.title = "Customer Orders";
      dsi1.subtitle = "Custom Set of Orders Table";
  
      const dsi2 = new $.ig.RVMySqlDataSourceItem(sqlDs);
      dsi2.id = "customer_orders_details";
      dsi2.title = "Customer Orders Details";
      dsi2.subtitle = "Custom Query to Customers_Orders_Details View";
  
      const dsi3 = new $.ig.RVMySqlDataSourceItem(sqlDs);
      dsi3.id = "sp_customer_orders";
      dsi3.title = "Stored Procedure - Customer_Orders";
      dsi3.subtitle = "@Parameter: Customer";
  
      callback(new $.ig.RevealDataSources([sqlDs], [dsi1, dsi2, dsi3], false));
    };
  }, [_selectedEmployee]);
   
  return (
    <>
      <div className={classes("column-layout editor-container")}>
        <div className={classes("column-layout group")}>
          <div className={classes("row-layout group_1")}>
            <p className={classes("typography__body-1 text")}>
              <span>Select a user to impersonate</span>
            </p>
            <IgrCombo
              outlined="true"
              data={northwindEmployees}
              valueKey="employeeId"
              displayKey="employeeLogin"
              value={_selectedEmployee ? [_selectedEmployee] : []}
              singleSelect="true"
              change={singleSelectComboChange}
              className={classes("single-select-combo")}
            ></IgrCombo>
          </div>
        </div>
        <div className={classes("column-layout group_2")}>
          <div className={classes("group_3")}>
            <div id='revealView' style={{ height: 'calc(100vh - 150px)', width: '100%', position: 'relative' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
