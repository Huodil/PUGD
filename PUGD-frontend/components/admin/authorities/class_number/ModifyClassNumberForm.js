import React from 'react';
import Button from '@/components/ui/Button';
import { UPDATE_CLASS_NUMBER } from '@/graphql/mutations/admin/authorities/class_number.mutations';
import { GET_CLASS_NUMBER } from '@/graphql/queries/admin/authorities/class_number.queries';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import SearchAuthorityModal from '@/components/admin/authorities/shared/SearchAuthor'
import LinkedAuthorityListView from '@/components/admin/authorities/shared/LinkedAuthorityListView';
import useClassNumberForm from './useClassNumberForm';
import TextBox from '@/components/ui/TextBox';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const ModifyClassNumberForm = () => {

    const {
        inputs,
        handleInputChange,
        ModalAuthorityType,
        HandleChosenAuthority,
        handleClose,
        OnAuthorityLinkChange,
        handleOpen,
        open,
        setInputValue, } = useClassNumberForm();



    const Router = useRouter()



    const [updateClassNumber] = useMutation(UPDATE_CLASS_NUMBER, {
        onCompleted: () => {
            Router.push("/admin/authorities/class_number")
        },
        onError: (error) => {
            alert(error.message);
        }
    });
    // const [getClassNumberAllFields, ClassNumberResponse] = useLazyQuery(GET_CLASS_NUMBER);


    const ClassNumberQuery = useQuery(GET_CLASS_NUMBER, {
        variables: {
            Id: Router.query.id
        },
        onError: (error) => {
            console.log(error.message);
        },
        onCompleted: (data) => {
            console.log(data);

            if (data && data.class_number && data.class_number.length > 0) {

                setInputValue(data.class_number[0])
            }
        },
    });
    const onSubmitForm = (event) => {
        event.preventDefault();
        onUpdateHandler()
    }
    const onUpdateHandler = () => {

        const class_number = {
            Id: Router.query.id,
            Name: inputs.Name,
            Subject_description: inputs.Subject_description,
            Url_thumbnail: inputs.URL_thumbnail,
            // Linked_authorities: inputs.Linked_authorities.map((authority) => {
            //     return {
            //         Linked_Authority_Id: authority.id,
            //         Linked_Authority_Type: authority.Authority_Type,
            //         Start: authority.Start,
            //         End: authority.End,
            //         Comment: authority.Comment,
            //         LinkType: authority.LinkType,
            //     }
            // }) 


        }
        console.log({ variables: class_number })

        updateClassNumber({ variables: class_number })



    }


    return (
        <React.Fragment>

            <Grid>
                <GridElement s={6}>
                    <TextBox
                        label="Name"
                        name="Name"
                        value={inputs.Name}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={6}>
                    <TextBox
                        label="Subject description"
                        name="Subject_description"
                        value={inputs.Subject_description}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>
            <Grid>
                <GridElement s={12}>
                    <TextBox
                        label="URL of thumbnail"
                        name="URL_thumbnail"
                        value={inputs.URL_thumbnail}
                        onChange={handleInputChange}
                    />
                </GridElement>
            </Grid>

            <h5> Linked Auhorities
            &nbsp;
            <RoundButton icon="add" size="30" onClick={e => handleOpen(0)} />
            </h5>

            <LinkedAuthorityListView
                Linked_authorities={inputs.Linked_authorities}
                OnAuthorityLinkChange={OnAuthorityLinkChange} />



            <br />

            <Button variant="contained">Cancel</Button>
            <Button variant="contained"
                onClick={onSubmitForm}>Save</Button>

            <SearchAuthorityModal
                open={open}
                handleClose={handleClose}
                HandleElementClick={HandleChosenAuthority}
                AuthorityType={ModalAuthorityType === 0 ? undefined : ModalAuthorityType}
            />
        </React.Fragment>
    )
}
export default ModifyClassNumberForm