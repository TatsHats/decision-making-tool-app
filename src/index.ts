function createApp(): void {
  const appContainer = createAppContainer();
  const listSection = createListSection();
  const buttonSection = createButtonSection();

  appContainer.append(listSection);
  appContainer.append(buttonSection);

  document.body.append(appContainer);
}

function createAppContainer(): HTMLElement {
  const appContainer = document.createElement('div');
  appContainer.classList.add('appContainer');

  const titleApp = document.createElement('h1');
  titleApp.textContent = 'Decision Making Tool';
  titleApp.classList.add('titleApp');
  appContainer.append(titleApp);

  return appContainer;
}

function createListSection(): HTMLElement {
  const listSection = document.createElement('div');
  listSection.classList.add('listSection');

  const titleList = document.createElement('h1');
  titleList.textContent = 'Образец потом заменить тайтл на таблицу';
  listSection.append(titleList);

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  listSection.append(startButton);

  return listSection;
}

function createButtonSection(): HTMLElement {
  const buttonSection = document.createElement('div');
  buttonSection.classList.add('buttonSection');

  const titlebuttonSection = document.createElement('h1');
  titlebuttonSection.textContent = 'Образец потом заменить тайтл на button';
  buttonSection.append(titlebuttonSection);

  return buttonSection;
}

createApp();
