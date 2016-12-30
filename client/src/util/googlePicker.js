// Google Picker window to choose presentation from user's Google Drive files

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

    // Create and render a Picker object for searching Google Slides presentations.
      // checks to see that both Picker API and Auth API have loaded
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.PRESENTATIONS);
        view.setMimeTypes('application/vnd.google-apps.presentation');
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    function pickerCallback(data) {
      if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        alert('The user selected: ' + fileId);
        console.log('Selected: ', data.docs[0]);
      }
    }

export default loadPicker;