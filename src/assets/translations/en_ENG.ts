export default {
  screens: {
    welcome: {
      title: 'Keep your\n favorite places',
      desc: 'Save all the important information about your favourite places in one place. The app allows you to add details such as name, address, description, categories and photo.',
      register: 'Sign Up',
      login: 'Sign In',
    },
    login: {
      letsSignIn: 'Let’s sign you in.',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      dontHaveAccount: 'Don’t have an account?',
      register: 'Register',
      submit: 'Sign In',
    },
    register: {
      createAccount: 'Create an account.',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      haveAccount: 'Already have an account?',
      login: 'Login',
      submit: 'Sign Up',
    },
    mainMap: {
      fab: {
        addPlace: 'Add place',
        spatialSearch: 'Spatial search',
      },
      searchPlaceholder: 'Search',
    },
    addPlace: {
      type: {
        device: 'Device location',
        map: 'Click on the map',
        search: 'Search for a place',
      },
      searchPlaceholder: 'Enter the address',
      next: 'NEXT',
      locationInformation: 'Information:',
      country: 'Country',
      address: 'Address',
      place: 'Place',
      form: {
        title: 'Details',
        name: 'Name of place',
        description: 'Description (optional)',
        category: 'Category',
        categoryChange: 'Change',
        defaultCategory: 'General',
        removePhoto: 'Remove added photo',
        submit: 'SAVE',
      },
    },
    spatialSearch: {
      title: 'Spatial search',
      createdPoints: 'Created points({{value}}/{{max}}):',
      hint: 'To create a search area, place at least 4 points on the map.',
      reset: 'Reset',
      search: 'Search',
    },
    places: {
      title: 'Found places({{value}})',
      noPlaces: 'No places were found in the search area.',
    },
    profile: {
      myPlaces: 'My Places',
    },
    placeDetails: {
      addressHeader: 'Address Details',
      mapHeader: 'Map',
    },
    editPlaceDetails: {
      title: 'Edit',
      photo: {
        new: 'New',
        old: 'Old',
      },
      submit: 'Update',
    },
    settings: {
      title: 'Settings',
      language: {
        title: 'Language',
        change: 'Change language',
        english: 'English',
        polish: 'Polish',
      },
      logout: 'Logout',
      version: 'Version',
    },
  },
  buttons: {
    tryAgain: 'Try again',
  },
  modals: {
    addPlace: {
      desc: 'Choose how you want to add\n a place on the map',
      options: {
        device: 'Device location',
        search: 'Search for a place',
        map: 'Click on the map',
      },
    },
    photoPicker: {
      desc: 'Add photo with',
      options: {
        gallery: 'GALLERY',
        camera: 'CAMERA',
      },
      or: 'OR',
    },
    categories: {
      title: 'Choose category',
    },
    deletePlace: {
      title: 'Delete Place',
      desc: 'Are you sure want to delete this place?',
      options: {
        cancel: 'Cancel',
        delete: 'Delete',
      },
    },
  },
  bottomTabs: {
    map: 'Map',
    profile: 'Profile',
  },
  errors: {
    name: 'ERROR',
    emailUsed: 'Email is already taken',
    requiredField: 'This field is required',
    invalidUsername: 'Invalid username',
    invalidEmail: 'Invalid email',
    invalidPassword: 'Invalid password',
    passwordsMustMatch: "Passwords don't match",
    failToGetLocation: 'Failed to get location of device. Make sure you have location enabled on your phone.',
  },
  internet: {
    noInternet: 'No internet connection was found. Check your connection or try restart application.',
  },
};
