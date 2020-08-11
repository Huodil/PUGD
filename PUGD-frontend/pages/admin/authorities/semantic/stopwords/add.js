import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthorityHeader from '@/components/admin/authorities/shared/authorityHeader'
import Card from '@/components/ui/Card/Card';
import AdminLayout from '@/components/adminLayout';
import TextBox from '@/components/ui/TextBox';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import useStopwordForm from '../../../../../components/admin/authorities/stopword/useStopwordForm';
const StopwordPage = (props) => {


    const { inputs,
        onAddHandler,
        handleInputChange, } = useStopwordForm();

    return (
        <div className="animate fadeLeft">

            <AuthorityHeader Authority="Sémantique : Mots vides" />


            <Card  >
                <h6 className="card-title">Ajouter un mot vide </h6>
                <TextBox
                    label="Mot vide"
                    name="word"
                    value={inputs.word}
                    onChange={handleInputChange}
                />
                <Link href="/admin/authorities/semantic/stopwords">
                    <Button >Annuler</Button>
                </Link>
                <Button
                    onClick={onAddHandler}
                >Enregister</Button>
            </Card>
        </div>
    );
};



StopwordPage.Layout = AdminLayout
export default StopwordPage  