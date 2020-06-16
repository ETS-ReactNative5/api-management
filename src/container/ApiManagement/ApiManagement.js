import React, { useState, useEffect } from 'react';
import KeyGenerator from '../../components/KeyGenerator/KeyGenerator';
import img from '../../assets/background.png';
import { Parallax, Background } from 'react-parallax';
import ApiData from '../../components/ApiData/ApiData';
import { connect } from 'react-redux';
import classes from './ApiManagement.css';
import * as actionCreators from '../../store/actions/actionCreators';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-users';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal'
import { updateAWSApi, generateAWSApiKey, deletAWSApiKey } from '../../PublicAPI/AWS/awsApiCalls';
import Modal from '../../components/UI/Modal/Modal';


const ApiManagement = props => {
    const [scopetable, populateScopeTable] = useState(null);
    const [deleteAPIWarning, populateDeleteAPIWarning] = useState(null);
    const [editModalData, populateEditModal] = useState(null);
    const [successModal, showSuccessModal] = useState(false);
    const [deleteWarningModal, showDeleteWarningModal] = useState(false);
    const [editModal, showEditModal] = useState(false);
    const [scopeModal, showScopeModal] = useState(false);
    const [showSpinnerForContent, toggleShowSpinnerForContent] = useState(false);
    const [errorModal, setErrorModal] = useState('');
    const [showSecret, setShowSecret] = useState(false);
    const [keyGeneratorElements, setKeyGeneratorElement] = useState({
        keyGeneratorName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            touched: false,
            validation: {
                required: true
            },
            valid: false
        }
    });

    useEffect(() => {
        console.log("FIRST USE EFFECT CALLED props: ", props);
        props.onGetUserData();
        props.onGetRoles();
        props.getUserProfile(props.userId);
    }, []);

    const deletAWSApiKeyHandler = key => {
        deletAWSApiKey(key, toggleShowSpinnerForContent, props.apiData, props.onDeleteUserData, setErrorModal);
    }

    const updateAWSApiHandler = data => {
        updateAWSApi(data, props.apiData, props.userId, props.onUpdateUserData, toggleShowSpinnerForContent, setErrorModal);

    }

    const generateAWSApiKeyHandler = event => {
        if (!keyGeneratorElements.keyGeneratorName.valid) {
            event.preventDefault();
            setErrorModal('Invalid Input Provided.');
            return;
        }
        generateAWSApiKey(event, keyGeneratorElements.keyGeneratorName.value, props.userId, showSuccessModal, props.onPostUserData, setErrorModal);
        const updatedElements = { ...props.keyGeneratorElements };
        const updatedElement = { ...updatedElements['keyGeneratorName'] };
        updatedElement.value = '';
        updatedElement.touched = false;
        updatedElement.valid = false
        updatedElements['keyGeneratorName'] = updatedElement;
        setKeyGeneratorElement(updatedElements);
    }

    return (
        <div>
            <div className={classes.content}>
                <Modal modalClosed={() => setErrorModal('')} show={errorModal}><ErrorModal error={errorModal} /></Modal>
                <Parallax
                    bgImage={img}
                    //blur={{ min: -25, max: 25 }}
                    bgImageAlt="the cat"
                    strength={-200}>
                    <div style={{ backgroundColor: '#00000059', height: '100vh', position: 'relative', overflow: 'hiden' }}>
                        <KeyGenerator
                            keyGeneratorElements={keyGeneratorElements}
                            setKeyGeneratorElement={setKeyGeneratorElement}
                            generateAWSApiKeyHandler={generateAWSApiKeyHandler} />
                    </div>
                </Parallax>
                <Parallax strength={300}>
                    <div style={{ height: '6vh' }}></div>
                    <Background className="custom-bg">
                        <img src={img} alt="fill murray" />
                    </Background>
                </Parallax>
                {/* <div style={{ backgroundColor: '#000000d1', height: '50vh', position: 'relative', overflow: 'hidden' }}> */}

                {/* </div> */}
                <Parallax
                    bgImage={img}
                    bgImageAlt="the cat"
                    strength={-200}>

                </Parallax>
                <Parallax
                    bgImage={img}
                    bgImageAlt="the dog"
                    strength={200}>
                    <div style={{ backgroundColor: '#00000059', minHeight: '70vh', position: 'relative', overflow: 'hiden' }}>
                        {/* test code */}
                        {/* <div class="curved-div upper">
                            <svg viewBox="0 0 1440 319">
                                <path fill="#194752ed" fill-opacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div> */}
                        {/* <div class="curved-div">
                            <svg viewBox="0 0 1440 319">
                                <path fill="#194752ed" fill-opacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div> */}
                        {/* test code end */}
                        <div className={classes.testdiv}>
                            <div className={classes.wave} />
                            {(props.apiData && !showSpinnerForContent && props.profileInfo) ? <ApiData
                                deletAWSApiKeyHandler={(data) => deletAWSApiKeyHandler(data)}
                                updateAWSApiHandler={(data) => updateAWSApiHandler(data)}
                                apiData={props.apiData}
                                scopeModal={scopeModal}
                                showScopeModal={showScopeModal}
                                scopetable={scopetable}
                                populateScopeTableHandler={(data) => { populateScopeTable(data); showScopeModal(true); }}
                                editModal={editModal}
                                showEditModal={showEditModal}
                                populateEditModal={(data) => { populateEditModal(data); showEditModal(true); }}
                                deleteWarningModal={deleteWarningModal}
                                showDeleteWarningModal={showDeleteWarningModal}
                                populateDeleteAPIWarning={(data) => { populateDeleteAPIWarning(data); showDeleteWarningModal(true); }}
                                deleteAPIWarning={deleteAPIWarning}
                                editModalData={editModalData}
                                showSpinnerForContent={showSpinnerForContent}
                                toggleShowSpinnerForContent={toggleShowSpinnerForContent}
                                isSuperUser={props.isSuperUser}
                                showSecret={showSecret}
                                setShowSecret={setShowSecret}
                                profileInfo={props.profileInfo}
                                roles={props.roles} /> : <Spinner />}
                        </div></div>
                    {/* Footer here */}
                </Parallax>
                <Parallax strength={300}>
                    <div style={{ height: '20vh' }}></div>
                    <div class="curved-div">
                            <svg viewBox="0 0 1440 319">
                                <path fill="#194752ed" fill-opacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    <Background className="custom-bg">
                        <img src={img} alt="fill murray" />
                    </Background>
                </Parallax>
                {/* <div style={{ backgroundColor: '#194752ed', height: '50vh' }} /> */}
                <SuccessModal showSuccessModal={showSuccessModal} successModal={successModal} />

            </div>
        </div>
    );

}
const mapDispatchToState = state => {
    return {
        apiData: state.manageUsersReducer.apiData,
        profileInfo: state.profilesReducer.profileInfo,
        userId: state.auth.userId,
        isSuperUser: state.profilesReducer.isSuperUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserData: () => dispatch(actionCreators.getUserData()),
        getUserProfile: (userId) => dispatch(actionCreators.getUserProfile(userId)),
        onGetRoles: () => dispatch(actionCreators.getRoles()),
        onDeleteUserData: (userId) => dispatch(actionCreators.deleteUserData(userId)),
        onUpdateUserData: (userData, key) => dispatch(actionCreators.updateUserData(userData, key)),
        onPostUserData: (userData) => dispatch(actionCreators.postUserData(userData))
    }
}

export default connect(mapDispatchToState, mapDispatchToProps)(withErrorHandler(ApiManagement, axios));
