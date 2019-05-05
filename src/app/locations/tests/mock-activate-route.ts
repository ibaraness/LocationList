export class MockActivateRoute {
  snapshot = {
    paramMap: {
      get(param) {
        return 1;
      }
    }
  };
}

export class MockActivateRouteNoParams {
  snapshot = {
    paramMap: {
      get(param) {
        return null;
      }
    }
  };
}


