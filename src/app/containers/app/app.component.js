export const AppComponent = {
  template: `
    <div class="app">
     <game>
     </game>
    </div>
  `,
  controller: class AppComponent {
    constructor() {
      'ngInject';

      this.button = null;
      this.user = {};
    }

    $onInit() {
      this.button = 'Logout';
      this.user = {
        email: 'user@email.com',
        password: '3%2f43#}54f[st31'
      };
    }

    logout() {
      // change for service call
      console.log(this.user, 'has been logged out...');
    }
  }
};
