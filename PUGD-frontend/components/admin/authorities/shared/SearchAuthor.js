import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import Card from '@/components/ui/Card/Card';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_AUTHOR } from '@/graphql/queries/admin/authorities/author.queries';
import { GET_CATEGORY_ALL_FIELDS } from '@/graphql/queries/admin/authorities/category.queries';
import { GET_PUBLISHER_ALL_FIELDS } from '@/graphql/queries/admin/authorities/publisher.queries';
import { GET_SERIES_ALL_FIELDS } from '@/graphql/queries/admin/authorities/series.queries';
import { GET_SUB_SERIES_ALL_FIELDS } from '@/graphql/queries/admin/authorities/sub_series.queries';
import { GET_COLLECTION_TITLE } from '@/graphql/queries/admin/authorities/collection_title.queries';
import { GET_UNIFORM_TITLE } from '@/graphql/queries/admin/authorities/uniform_title.queries';
import { GET_CLASS_NUMBER } from '@/graphql/queries/admin/authorities/class_number.queries';
import SelectBox from '@/components/ui/SelectBox';

import SearchAuthorComponent from '../author/SearchAuthorComponent';
import ListAuthorComponent from '../author/ListAuthorComponent';
import SearchCategoryComponent from '../category/SearchCategoryComponent'
import ListCategoryComponent from '../category/ListCategoryComponent'
import SearchPublisherComponent from '../publisher/SearchPublisherComponent'
import ListPublisherComponent from '../publisher/ListPublisherComponent'
import SearchSeriesComponent from '../series/SearchSeriesComponent'
import ListSeriesComponent from '../series/ListSeriesComponent'
import SearchSubSeriesComponent from '@/components/admin/authorities/sub_series/SearchSubSeriesComponent';
import ListSubSeriesComponent from '@/components/admin/authorities/sub_series/ListSubSeriesComponent';
import SearchCollectionTitleComponent from '@/components/admin/authorities/collection_title/SearchCollectionTitleComponent';
import ListCollectionTitleComponent from '@/components/admin/authorities/collection_title/ListCollectionTitleComponent';
import SearchUniformTitleComponent from '@/components/admin/authorities/uniform_title/SearchUniformTitleComponent';
import ListUniformTitleComponent from '@/components/admin/authorities/uniform_title/ListUniformTitleComponent';
import SearchClassNumberComponent from '@/components/admin/authorities/class_number/SearchClassNumberComponent';
import ListClassNumberComponent from '@/components/admin/authorities/class_number/ListClassNumberComponent';
const SearchAuthority = ({ HandleElementClick, open, handleClose, AuthorityType }) => {
    const [getAuthorAllFields, { loading, error, data }] = useLazyQuery(GET_AUTHOR);
    const [getCategoryAllFields, CategoryResponse] = useLazyQuery(GET_CATEGORY_ALL_FIELDS);
    const [getPublisherAllFields, PublisherResponse] = useLazyQuery(GET_PUBLISHER_ALL_FIELDS);
    const [getSeriesAllFields, SeriesResponse] = useLazyQuery(GET_SERIES_ALL_FIELDS);
    const [getSubSeriesAllFields, SubSeriesResponse] = useLazyQuery(GET_SUB_SERIES_ALL_FIELDS);
    const [getCollectionTitleAllFields, CollectionTitleResponse] = useLazyQuery(GET_COLLECTION_TITLE);
    const [getUniformTitleAllFields, UniformTitleResponse] = useLazyQuery(GET_UNIFORM_TITLE);
    const [getClassNumberAllFields, ClassNumberResponse] = useLazyQuery(GET_CLASS_NUMBER);
    const [Authority_Type, setAuthority_Type] = useState(AuthorityType || 10)
    useEffect(() => {
        if (AuthorityType !== undefined)
            setAuthority_Type(AuthorityType)
    }, [AuthorityType]);
    const renderSwitch = () => {
        switch (Authority_Type) {
            case 10:
                {

                    return <React.Fragment>
                        <Card  >
                            <SearchAuthorComponent
                                getAuthorAllFields={getAuthorAllFields}
                                SearchOnly />
                        </Card>
                        <Card  >
                            <h4 className="card-title">Recherche : Auteurs</h4>
                            {error ? <div color="danger">{String(error.message)}</div> : null}

                            <ListAuthorComponent authors={data && data.author} HandleElementClick={HandleElementClick} />

                        </Card>
                    </React.Fragment>
                }
            case 20:
                {


                    return <React.Fragment>
                        <Card  >
                            <SearchCategoryComponent getCategoryAllFields={getCategoryAllFields} SearchOnly />
                        </Card>
                        <Card  >
                            <h4 className="card-title">Recherche : Categories</h4>
                            <ListCategoryComponent categories={CategoryResponse.data && CategoryResponse.data.category_all_fields} HandleElementClick={HandleElementClick} />
                        </Card>
                    </React.Fragment>
                }
            case 30:
                {

                    return <React.Fragment>
                        <Card  >
                            <SearchPublisherComponent getPublisherAllFields={getPublisherAllFields} SearchOnly />
                        </Card>
                        <Card  >
                            <h4 className="card-title">Recherche : Publishers</h4>
                            {error ? <div color="danger">{String(PublisherResponse.error.message)}</div> : null}
                            {PublisherResponse.data &&
                                <ListPublisherComponent publishers={PublisherResponse.data.publisher_all_fields} HandleElementClick={HandleElementClick} />
                            }
                        </Card>
                    </React.Fragment>
                }
            case 40:
                {

                    return <React.Fragment>
                        <Card  >
                            <SearchSeriesComponent getSeriesAllFields={getSeriesAllFields} SearchOnly />
                        </Card>
                        <Card  >
                            <h4 className="card-title">Recherche : Series</h4>
                            {SeriesResponse.error ? <div color="danger">{String(SeriesResponse.error.message)}</div> : null}
                            {SeriesResponse.data &&
                                <ListSeriesComponent series={SeriesResponse.data.series_all_fields} HandleElementClick={HandleElementClick} />
                            }
                        </Card>
                    </React.Fragment>
                }
            case 50:
                {

                    return <React.Fragment>
                        <Card  >
                            <SearchSubSeriesComponent getSubSeriesAllFields={getSubSeriesAllFields} SearchOnly />

                        </Card>

                        <Card  >
                            <h4 className="card-title">Recherche : Sub-Series</h4>
                            {SubSeriesResponse.error ? <div color="danger">{String(SubSeriesResponse.error.message)}</div> : null}
                            {SubSeriesResponse.data &&
                                <ListSubSeriesComponent sub_series={SubSeriesResponse.data.sub_series_all_fields} HandleElementClick={HandleElementClick} />
                            }

                        </Card>
                    </React.Fragment>
                }
            case 60:
                {

                    return <React.Fragment>
                        <Card  >
                            <SearchCollectionTitleComponent getCollectionTitleAllFields={getCollectionTitleAllFields} SearchOnly />
                        </Card>

                        <Card  >
                            <h4 className="card-title">Recherche : collection title</h4>
                            {CollectionTitleResponse.error ? <div color="danger">{String(CollectionTitleResponse.error.message)}</div> : null}
                            {CollectionTitleResponse.data &&
                                <ListCollectionTitleComponent collection_titles={CollectionTitleResponse.data.collection_title} HandleElementClick={HandleElementClick} />
                            }
                        </Card>
                    </React.Fragment>
                }
            case 70:
                {

                    return <React.Fragment>
                        <Card  >
                            <SearchUniformTitleComponent getUniformTitleAllFields={getUniformTitleAllFields} SearchOnly />
                        </Card>

                        <Card  >
                            <h4 className="card-title">Recherche : UniformTitle</h4>
                            {UniformTitleResponse.error ? <div color="danger">{String(UniformTitleResponse.error.message)}</div> : null}
                            {UniformTitleResponse.data &&
                                <ListUniformTitleComponent uniform_titles={UniformTitleResponse.data.uniform_title} HandleElementClick={HandleElementClick} />
                            }
                        </Card>
                    </React.Fragment>
                }
            case 80:
                {

                    return <React.Fragment>
                        <Card  >
                            <SearchClassNumberComponent getClassNumberAllFields={getClassNumberAllFields} SearchOnly />

                        </Card>

                        <Card  >
                            <h4 className="card-title">Recherche : class number</h4>
                            {ClassNumberResponse.error ? <div color="danger">{String(ClassNumberResponse.error.message)}</div> : null}
                            {ClassNumberResponse.data &&
                                <ListClassNumberComponent class_numbers={ClassNumberResponse.data.class_number} HandleElementClick={HandleElementClick} />
                            }
                        </Card>
                    </React.Fragment>
                }
            default:
                return 'Not yet implemented';
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >

            {!AuthorityType &&
                <Grid >
                    <GridElement s={6}>
                        <h5 id="simple-modal-title">Linked authorities</h5>
                        <SelectBox
                            label="Authority"
                            value={Authority_Type}
                            onChange={e => { setAuthority_Type(Number(e.target.value)) }}>
                            <option value={10}>Authors</option>
                            <option value={20}>Subject headings</option>
                            <option value={30}>Publishers</option>
                            <option value={40}>Series</option>
                            <option value={50}>Sub-series</option>
                            <option value={60}>Collection Title</option>
                            <option value={70}>Uniform Titles</option>
                            <option value={80}>Class number</option>
                        </SelectBox>
                    </GridElement>
                </Grid>}
            {renderSwitch()}

        </Modal>
    );
}
export default SearchAuthority