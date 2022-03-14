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
import client,{getProducts, createProduct, updateProduct, authClient, getPoleceniaPLC} from "../apollo-client";
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
          query:getPoleceniaPLC, 
          variables:{
              offset:page * query.pageSize,
              limit:query.pageSize,
              search:query.search,          
          } 
      }).then((res)=>{
          var unfrozenRes = JSON.parse(JSON.stringify(res));
          //now I need to translate the virtual reality into one that is even more virtual
  
          resolve( 
            {
              data:unfrozenRes?.data?.allOperacjePLCS.map((m,i)=>
              {return {
                  ...m,
                timeSubmitted: new Date(m.timeSubmitted).toLocaleString(),
                payload: (m?.payload?(m?.payload.substring(0,35)):(null)) }}),
              page:page,
              totalCount:unfrozenRes.data._allOperacjePLCSMeta.count,
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
          field:'name',  
      },
      {
        title:'Czas',
        field:'timeSubmitted',  
    },
    {
        title:'Status',
        field:'status',  
    },
    {
        title:'Payload',
        field:'payload',  
    },

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

            />
        </div>
    )
}

export default Table;

