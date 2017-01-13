// Google Picker window to choose presentation from user's Google Drive files
// Assign a lectureId to the chosen presentation. Load this information to the store
import $ from 'jquery';
import setLectureId from './setLectureId';
import store from '../store.jsx';
import { browserHistory } from 'react-router';

// The Browser API key obtained from the Google Developers Console.
var developerKey = 'AIzaSyDqyarNe48JyUUU36b32iblZ7A3HbHXNF4';

// The Client ID obtained from the Google Developers Console.
var clientId = '472492304712-1omf26gq2el8ovmleturcihefs6o8463.apps.googleusercontent.com';

// App ID (first number in the Client ID)
var appId = '472492304712';

// Scope to use to access user's Drive items:
  // Google Drive (read-only)
  // Google Slides (read-only)
var scope = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/presentations.readonly'];

var pickerApiLoaded = false;
var oauthToken;
var selectedPresentation;

// Use the Google API Loader script to load the google.picker script.
function loadPicker() {
  gapi.load('auth', {'callback': onAuthApiLoad});
  gapi.load('picker', {'callback': onPickerApiLoad});
}

function onAuthApiLoad() {
  window.gapi.auth.authorize(
      {
        'client_id': clientId,
        'scope': scope,
        'immediate': false
      },
      handleAuthResult);
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}

// get picker from the store
let picker = store.getState().picker

// Create and render a Picker object for searching Google Slides presentations.
  // checks to see that both Picker API and Auth API have loaded
function createPicker() {
  if (pickerApiLoaded && oauthToken) {
    var view = new google.picker.View(google.picker.ViewId.PRESENTATIONS);
    view.setMimeTypes('application/vnd.google-apps.presentation');
    // if picker is not already set, create it
    if (!picker) {
      picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .setAppId(appId)
          .setOAuthToken(oauthToken)
          .addView(view)
          .setDeveloperKey(developerKey)
          .setCallback(pickerSlideCallback)
          .build();
      // set picker in the store
      store.dispatch({type:'SET_PICKER', picker: picker})
    }
    // set picker to visible
    picker.setVisible(true);
  }
}

// CALLBACK THAT HAPPENS WHEN PRESENTATION IS SELECTED
function pickerSlideCallback(data) {
  if (data.action == google.picker.Action.PICKED) {
    let selectedPresentation = data.docs[0].id;
    let name = data.docs[0].name;
    let embedUrl = data.docs[0].embedUrl;
    let lectureId = setLectureId();
    let userId = store.getState().user.id;
    // Send POST request to initiate custom namespace on server
    $.ajax({
      type: 'POST',
      url: '/newRoom',
      data: JSON.stringify({room: lectureId}),
      contentType: 'application/json'
    });

    // Update store with presentation data
    store.dispatch({
      type: 'ASSIGN_LECTURE_ID',
      presentationId: selectedPresentation,
      lectureId: lectureId,
      embedUrl: embedUrl,
      name: name,
      socket: io(`/${lectureId}`)
    });

    // Socket event to trigger saving the lecture data in the DB
    let lecture = {
      id: lectureId,
      name: name,
      presentationId: selectedPresentation,
      userId: userId,
      role: 'presenter'
    };
    let socket = store.getState().activeLecture.socket
    socket.emit('saveLecture', lecture);

    // Redirect user to <PresenterView/>
    browserHistory.push('/presenter');
  }
}


export default loadPicker;