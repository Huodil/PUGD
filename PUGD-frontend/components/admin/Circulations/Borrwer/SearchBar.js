import React, {useEffect, useRef, useState} from 'react';
import {useLazyQuery} from 'react-apollo';
import {GET_AUTHOR} from "../../../../graphql/queries/admin/authorities/author.queries";
import {GET_ALL_GROUPS} from "../../../../graphql/queries/admin/Ciruclation/groups.query";


const Search = ({locations}) => {
    const ref = useRef();
    const [txt, setTxt] = useState("");
    const [data, setdata] = useState({});
    const [autocompleteInstance, setAutocompleteInstance] = useState({});
    const [getAuthor, reponse] = useLazyQuery(GET_ALL_GROUPS,
        {
            onCompleted: (data) => {
                const dataObj = {}
                data.GetAllGrroups.forEach(group => {
                    dataObj[group.name] = null
                });
                autocompleteInstance.updateData(dataObj)
            }
        });
    console.log("data query", reponse.data);
    console.log("data auto", data);
    useEffect(() => {
        setAutocompleteInstance(M.Autocomplete.init(ref.current, {
            data,
            onAutocomplete: (d) => {
                setNativeValue(ref.current, d)
                ref.current.dispatchEvent(new Event('input', {bubbles: true}));
            }
        }));
    }, [])
    console.log(txt);
    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">textsms</i>
                            <input type="text" id="autocomplete-input" className="autocomplete" ref={ref}
                                   value={txt}
                                   onChange={e => {
                                       setTxt(e.target.value)
                                       getAuthor({
                                           variables: {
                                               name: e.target.value
                                           }
                                       })
                                   }}
                            />
                            <label htmlFor="autocomplete-input">Autocomplete</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search

function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
}
