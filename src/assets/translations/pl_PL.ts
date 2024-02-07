export default {
  screens: {
    welcome: {
      title: 'Zachowaj swoje\n ulubione miejsca',
      desc: 'Zapisz wszystkie ważne informacje o swoich ulubionych miejscach w jednym miejscu. Aplikacja umożliwia dodawanie szczegółów, takich jak nazwa, adres, opis, kategoria i zdjęcie.',
      register: 'Zarejestruj się',
      login: 'Zaloguj się',
    },
    login: {
      letsSignIn: 'Logowanie.',
      email: 'Email',
      password: 'Hasło',
      forgotPassword: 'Zapomniałeś hasło?',
      dontHaveAccount: 'Nie posiadasz konta?',
      register: 'Zarejestruj się',
      submit: 'Zaloguj się',
    },
    register: {
      createAccount: 'Utwórz konto.',
      username: 'Nazwa użytkownika',
      email: 'Email',
      password: 'Hasło',
      confirmPassword: 'Potwierdź hasło',
      haveAccount: 'Posiadasz już konto?',
      login: 'Zaloguj się',
      submit: 'Zarejestruj się',
    },
    mainMap: {
      fab: {
        addPlace: 'Dodaj miejsce',
        spatialSearch: 'Wyszukiwanie przestrzenne',
        fitToPlaces: 'Dopasuj widok mapy do miejsc',
      },
      searchPlaceholder: 'Wyszukaj',
    },
    addPlace: {
      type: {
        device: 'Lokalizacja urządzenia',
        map: 'Kliknij na mapie',
        search: 'Wyszukaj miejsce',
      },
      searchPlaceholder: 'Wprowadź adres',
      next: 'DALEJ',
      locationInformation: 'Informacje:',
      country: 'Kraj',
      address: 'Adres',
      place: 'Miejscowość',
      form: {
        title: 'Szczegóły',
        name: 'Nazwa',
        description: 'Opis (opcjonalnie)',
        category: 'Kategoria',
        categoryChange: 'Zmień',
        defaultCategory: 'Ogólne',
        removePhoto: 'Usuń dodane zdjęcie',
        submit: 'ZAPISZ',
      },
    },
    spatialSearch: {
      title: 'Wyszukiwanie przestrzenne',
      createdPoints: 'Utworzone punkty({{value}}/{{max}}):',
      hint: 'Aby utworzyć obszar wyszukiwania, umieść co najmniej 4 punkty na mapie.',
      reset: 'ZRESETUJ',
      search: 'Szukaj',
    },
    places: {
      title: 'Znalezione miejsca({{value}})',
      noPlaces: 'Nie znaleziono żadnych miejsc w poszukiwanym obszarze.',
    },
    profile: {
      myPlaces: 'Moje miejsca',
      noPlaces: 'Nie masz jeszcze żadnych dodanych miejsc.',
    },
    placeDetails: {
      addressHeader: 'Szczegóły adresu',
      mapHeader: 'Mapa',
      share: {
        buttonText: 'Udostępnij lokalizację',
        options: {
          title: 'Lokalizacja miejsca',
          message: 'Sprawdź to miejsce: {{name}}',
        },
      },
    },
    editPlaceDetails: {
      title: 'Edycja',
      photo: {
        new: 'Nowe',
        old: 'Aktualne',
      },
      submit: 'Zaktualizuj',
    },
    settings: {
      title: 'Ustawienia',
      language: {
        title: 'Język',
        change: 'Zmień język',
        english: 'Angielski',
        polish: 'Polski',
      },
      logout: 'Wyloguj się',
      version: 'Wersja',
    },
  },
  buttons: {
    tryAgain: 'Spróbuj ponownie',
  },
  modals: {
    addPlace: {
      desc: 'Wybierz sposób dodawania miejsca na mapie',
      options: {
        device: 'Lokalizacja urządzenia',
        search: 'Wyszukaj miejsce',
        map: 'Kliknij na mapie',
      },
    },
    photoPicker: {
      desc: 'Dodaj zdjęcie za pomocą',
      options: {
        gallery: 'GALERII',
        camera: 'KAMERY',
      },
      or: 'LUB',
    },
    categories: {
      title: 'Wybierz kategorię',
    },
    deletePlace: {
      title: 'Usuń miejsce',
      desc: 'Czy na pewno chcesz usunąć to miejsce?',
      options: {
        cancel: 'Anuluj',
        delete: 'Usuń',
      },
    },
    placeInfo: {
      details: 'Szczegóły',
    },
  },
  bottomTabs: {
    map: 'Mapa',
    profile: 'Profil',
  },
  errors: {
    name: 'BŁĄD',
    emailUsed: 'Email jest już zajęty',
    requiredField: 'To pole jest wymagane',
    invalidUsername: 'Nieprawidłowa nazwa użytkownika',
    invalidEmail: 'Nieprawidłowy email',
    invalidPassword: 'Nieprawidłowe hasło',
    passwordsMustMatch: 'Hasła nie pasują do siebie',
    failToGetLocation: 'Nie udało się pobrać lokalizacji. Spróbuj ponownie.',
    loginFailed: 'Nieprawidłowy email lub hasło.\n Spróbuj ponownie.',
    registerFailed: 'Nie udało się utworzyć konta.\n Spróbuj ponownie.',
  },
  internet: {
    noInternet: 'Brak dostępu do internetu. Sprawdź swoje połączenie lub spróbuj ponownie uruchomić aplikację.',
  },
};
