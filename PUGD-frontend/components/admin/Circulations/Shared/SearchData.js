import React from "react";
import DocumentTable from "../Retour_Document/DocumentTable";
import NoDataFetched from "./NoData";
import HavePret from "../Retour_Document/HavePret";

const SearchDataResult = ({result,statusDoc, text, ...props}) => {
    return <React.Fragment>
        <div>
            {
                result != null ?
                    <DocumentTable
                        DataSet={result && result.copy}
                        statusDoc={ statusDoc}
                    />
                    :
                    <NoDataFetched/>
            }
        </div>
    </React.Fragment>
}
export default SearchDataResult