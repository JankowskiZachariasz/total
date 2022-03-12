/* eslint-disable react/display-name */
import React,{forwardRef,useState, useRef,useMemo, useEffect} from "react";
import { Input } from '@material-ui/core';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Refresh from '@material-ui/icons/Refresh';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import client,{getProducts, createProduct, updateProduct, authClient} from "../apollo-client";
import styles from './Table.module.css'
import useUser from "../lib/useUser";


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Refresh: forwardRef((props, ref) => <Refresh {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };




const Table = (props)=>{


  const remoteData = async (query)=>{
    return new Promise((resolve,reject)=>{
      console.log("Query object - ",query)
      var page = query.page;
      if(query.oneTimeTeleport)page=0;
      authClient(token).query({
          query:getProducts, 
          variables:{
              offset:page * query.pageSize,
              limit:query.pageSize,
              search:query.search,          
          } 
      }).then((res)=>{
          var unfrozenRes = JSON.parse(JSON.stringify(res));
          //now I need to translate the virtual reality into one that is even more virtual
          var outputRows = [];
          //Nazwa	Seria1	Seria2	Seria 3	Paczki/PLCid	Długość, id, parentId
          unfrozenRes?.data?.allProducts?.forEach(element => {
            var parent = {
              Nazwa: (element.namePlc&&element.namePlc!=''&&element.namePlc!=' '&&element.namePlc!=' ')?(element.namePlc):("..."),
              Seria1: element.series1?(element.series1):(0),
              Seria2: element.series2?(element.series2):(0),
              Seria3: element.series3?(element.series3):(0),
              plcidPaczki: element.count,
              dlugosc: '',
              id: element.id,
              parentId: null,
              ktoraPaczka:0,
            };
  
            var child1 = {
              Nazwa: element.plcId1?'Paczka 1':'[puste]',
              Seria1: '',
              Seria2: '',
              Seria3: '',
              plcidPaczki: element.plcId1<0?('('+-element.plcId1+')'):(element.plcId1),
              dlugosc: element.length1,
              id: '',
              parentId: element.id,
              ktoraPaczka:1,
            };
  
            var child2 = {
              Nazwa: element.plcId2?'Paczka 2':'[puste]',
              Seria1: '',
              Seria2: '',
              Seria3: '',
              plcidPaczki: element.plcId2<0?('('+-element.plcId2+')'):(element.plcId2),
              dlugosc: element.length2,
              id: '',
              parentId: element.id,
              ktoraPaczka:2,
            };
  
            var child3 = {
              Nazwa: element.plcId3?'Paczka 3':'[puste]',
              Seria1: '',
              Seria2: '',
              Seria3: '',
              plcidPaczki: element.plcId3<0?('('+-element.plcId3+')'):(element.plcId3),
              dlugosc: element.length3,
              id: '',
              parentId: element.id,
              ktoraPaczka:3,
            };
  
            outputRows.push(...[parent,child1,child2,child3])
          });
  
  
          resolve( 
            {
              data:outputRows,
              page:page,
              totalCount:unfrozenRes.data._allProductsMeta.count,
              oneTimeTeleport:null
            }
              
          );
      })
    })    
  }
  const {token} = useUser();

  useEffect(() => {
    tableRef?.current?.onQueryChange();
  },[token]);

  const tableRef = React.useRef();

  const [loading, setLoading]  = React.useState(false);

  const tableColumnConfig = useMemo(() => [
      {
          title:'Nazwa',
          field:'Nazwa',
          editable: 'onAdd',
          validate: rowData => {
            if(rowData?.Nazwa?.length>0&&rowData?.Nazwa?.length<=15)
            return true;
            return false;
          },
          
      },
      {
          title:'Seria 1',
          field:'Seria1',
          editable: 'onAdd',
          validate: rowData => {
            var num = Number.parseInt(rowData.Seria1)
            if(Number.isNaN(num))return false
            else return(num>=0&&num<=32767)
          },
      },
      {
          title:'Seria 2',
          field:'Seria2',
          editable: 'onAdd',
          validate: rowData => {
            var num = Number.parseInt(rowData.Seria2)
            if(Number.isNaN(num))return false
            else return(num>=0&&num<=32767)
          },
      },
      { 
          title:'Seria 3',
          field:'Seria3',
          editable: 'onAdd',
          validate: rowData => {
            var num = Number.parseInt(rowData.Seria3)
            if(Number.isNaN(num))return false
            else return(num>=0&&num<=32767)
          },
      },
      {
          title:'Paczki / ID',
          field:'plcidPaczki',
          editable: 'never'
      },
      {
          title:'Liczba Paczek',
          field:'dlugosc',
          editable: 'onUpdate',
          
      }
  ], []);
  
    //console.log(outputRows)
    return (
        <div className={styles.materialTable}>
            <MaterialTable
                localization={{
                  header:{
                    actions:'Polecenia',
                    
                  },
                  pagination:{
                    labelRowsSelect:'rzędów',
                    firstTooltip:'pierwsza strona',
                    previousTooltip:'poprzednia strona',
                    nextTooltip:'następna strona',
                    lastTooltip:'ostatnia strona',

                  },
                  body:{
                    addTooltip:'dodaj produkt'
                  },
                  toolbar:{
                    searchTooltip:'szukaj',
                    searchPlaceholder: 'znajdź produkt...'
                  }
                }}
                isLoading={loading}
                title={''}
                tableRef={tableRef}
                icons={tableIcons}
                columns={tableColumnConfig}
                data={remoteData}
                options={{
                  sorting:false,
                  draggable:false,
                  addRowPosition:'first',
                    toolbar:true,
                    selection:false,
                    actionsColumnIndex: -1,
                    rowStyle: rowData => ({
                        backgroundColor: (rowData.parentId != null) ? '#EEE' : '#FFF'
                      })
                }}
                parentChildData={(row, rows) => rows.find(a => (a.id===row.parentId))}
                cellEditable={{
                  cellStyle: { width: 'calc(33%-50px)' },
                  onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                    return new Promise((resolve, reject) => {
                      //ustalamy gdzie jest zmiana
                      var isParentRow = rowData?.parentId==null;
                      console.log(columnDef.field);
                      console.log(isParentRow);

                      
                      var changes={};
                      //tackling variables
                      if(isParentRow&&columnDef.field=='Nazwa'){
                        changes.namePlc=newValue;
                      }
                      else if(isParentRow&&columnDef.field=='Seria1'){
                        
                        changes.series1=(Number.isNaN(Number.parseInt(newValue))?(Number.parseInt(oldValue)):(Number.parseInt(newValue)));
                      }
                      else if(isParentRow&&columnDef.field=='Seria2'){
                        changes.series2=(Number.isNaN(Number.parseInt(newValue))?(Number.parseInt(oldValue)):(Number.parseInt(newValue)));
                      }
                      else if(isParentRow&&columnDef.field=='Seria3'){
                        changes.series3=(Number.isNaN(Number.parseInt(newValue))?(Number.parseInt(oldValue)):(Number.parseInt(newValue)));
                      }
                      else if((!isParentRow)&&columnDef.field=='dlugosc'){
                        switch(rowData?.ktoraPaczka){
                          case(1):{changes.length1=(Number.isNaN(Number.parseInt(newValue))?(Number.parseInt(oldValue)):(Number.parseInt(newValue)));break;}
                          case(2):{changes.length2=(Number.isNaN(Number.parseInt(newValue))?(Number.parseInt(oldValue)):(Number.parseInt(newValue)));break;}
                          case(3):{changes.length3=(Number.isNaN(Number.parseInt(newValue))?(Number.parseInt(oldValue)):(Number.parseInt(newValue)));break;}
                        }
                      }


                       //work out which row was clicked
                       var rowClicked = 0;
                       //console.log(tableRef.current);
                       tableRef.current.dataManager.pagedData.forEach((element,i) => {
                         if(element.id==(rowData.parentId?(rowData.parentId):(rowData.id)))
                         rowClicked=i;
                       });

                      var variables={
                        id:rowData.parentId?(rowData.parentId):(rowData.id),
                        product:{
                          ...changes,wasUpdatedByClient:true
                        }};
                        console.log(variables);
                    if(Object.keys(changes).length>0){
                      try{
                        console.log(token);
                        authClient(token).query({
                          query:updateProduct, 
                          variables
                        }).then((res)=>{
                          if(tableRef?.current?.state?.query?.search==''&&tableRef?.current?.dataManager?.pagedData[rowClicked]?.tableData?.isTreeExpanded)
                          tableRef.current.onQueryChange(null, ()=>tableRef.current.onTreeExpandChanged([rowClicked],tableRef.current.dataManager.pagedData[rowClicked]));
                          else
                          tableRef.current.onQueryChange(null, null);
                          resolve();
                        }).catch(e=>{console.log(e);resolve();});
                      }
                      catch(e){console.log(e)}
                      
                    }
                    else resolve();
                    
                    });
                  }
                }}
                actions={[
                  rowData => ({
                    icon: tableIcons.Add,
                    tooltip: 'Dodaj Paczkę',
                    onClick: (event, rowData) => 
                      new Promise((resolve, reject) => {
                        //work out which row was clicked
                        var rowClicked = 0;
                        //console.log(tableRef.current);
                        tableRef.current.dataManager.pagedData.forEach((element,i) => {
                          if(element.id==rowData.parentId)
                          rowClicked=i;
                        });
                        var paczkaUpdate = {};
                        switch(rowData.ktoraPaczka){
                          case(1):{
                            paczkaUpdate.plcId1 = 10000;
                            paczkaUpdate.length1 = 0;
                            break;}
                          case(2):{
                            paczkaUpdate.plcId2 = 10000;
                            paczkaUpdate.length2 = 0;
                            break;}
                          case(3):{
                            paczkaUpdate.plcId3 = 10000;
                            paczkaUpdate.length3 = 0;
                            break;}
                        }
                        var variables={
                          id:rowData.parentId,
                          product:{
                            ...paczkaUpdate,wasUpdatedByClient:true
                          }};
                          authClient(token).query({
                        query:updateProduct, 
                        variables
                      }).then((res)=>{
                        if(tableRef?.current?.state?.query?.search=='')
                        tableRef.current.onQueryChange(null, ()=>tableRef.current.onTreeExpandChanged([rowClicked],tableRef.current.dataManager.pagedData[rowClicked]));
                        else
                        tableRef.current.onQueryChange(null, null);
                        setLoading(false);
                        resolve();
                      });
                      }),
                    hidden: (rowData.Nazwa != '[puste]')
                  }),
                  rowData => ({
                    icon: tableIcons.Delete,
                    tooltip: rowData.parentId==null?('Usuń Produkt'):('Usuń Paczkę'),
                     onClick: (event, rowData) => 
                      new Promise(async (resolve, reject) => {

                        var val = confirm(rowData.parentId!=null?("Czy na pewno chcesz usunąć paczkę?"):('Czy na pewno chcesz usunąć produkt "'+rowData.Nazwa+'"?'));
                        if (val == false){
                          reject(); return;
                        }
                        

                        //work out which row was clicked
                        var rowClicked = 0;
                        //console.log(tableRef.current);
                        tableRef.current.dataManager.pagedData.forEach((element,i) => {
                          if(element.id==rowData.parentId)
                          rowClicked=i;
                        });
                        var paczkaUpdate = {};
                        switch(rowData.ktoraPaczka){
                          case(0):{
                            paczkaUpdate.toDelete=true;
                            break;}
                          case(1):{
                            paczkaUpdate.plcId1 = null;
                            paczkaUpdate.length1 = null;
                            break;}
                          case(2):{
                            paczkaUpdate.plcId2 = null;
                            paczkaUpdate.length2 = null;
                            break;}
                          case(3):{
                            paczkaUpdate.plcId3 = null;
                            paczkaUpdate.length3 = null;
                            break;}
                        }
                        var variables={
                          id:rowData.parentId?(rowData.parentId):(rowData.id),
                          product:{
                            ...paczkaUpdate,wasUpdatedByClient:true
                          }};
                          var goBackAPage = tableRef.current.dataManager.pagedData.length==1&&rowData.ktoraPaczka==0;//...or go  back a page
                          var refreshAfterUpdate = !goBackAPage;
                          console.log(refreshAfterUpdate)
                          authClient(token).query({
                        query:updateProduct, 
                        variables
                      }).then((res)=>{
                        if(refreshAfterUpdate){
                          tableRef.current.onQueryChange(null, ()=>{
                            if(rowData.ktoraPaczka!=0&&tableRef?.current?.state?.query?.search==''){
                              tableRef.current.onTreeExpandChanged([rowClicked],tableRef.current.dataManager.pagedData[rowClicked]);
                            }
                          });
                        }
                        if(goBackAPage){
                          var currentPage = tableRef?.current?.state?.query?.page;
                          var newPage = currentPage!=0?(currentPage-1):(0)
                          tableRef.current.onChangePage(null,newPage);
                        }
                        
                        setLoading(false);
                        resolve();
                      });
                      }),
                    hidden: (rowData.Nazwa == '[puste]')
                  }),
                  {
                    icon: tableIcons.Refresh,
                    tooltip: 'Odśwież tabelę',
                    isFreeAction: true,
                    onClick: () => {
                    if(tableRef.current){
                      tableRef.current.onQueryChange();
                    }},
                  }
                 
                ]}
                editable={{
                    onRowAdd: newData =>{
                      return  new Promise((resolve, reject) => {
                        var variables={
                          product:{
                            namePlc:newData.Nazwa,
                            series1:Number.parseInt(newData.Seria1),
                            series2:Number.parseInt(newData.Seria2),
                            series3:Number.parseInt(newData.Seria3)
                          }};
                          console.log(variables)
                          authClient(token).query({
                          query:createProduct, 
                          variables
                          
                      }).then((res)=>{
                        try{
                          tableRef.current.state.query.page = 0;
                        }
                        catch(e){console.log(e);}                  
                        resolve();
                      });
                      })
                    }
                     
                      
                    }}
            />
        </div>
    )
}

export default Table;

