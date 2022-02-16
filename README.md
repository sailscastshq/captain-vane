# captain-vane

captain-vane is a Sails hook that allows you generate realistically test data for a Sails application

## Installation

Install both `captain-vane` and `captain-vane-generator` as devDependencies in your Sails application.

```sh
npm i captain-vane captain-vane-generator --save-dev
```

Edit `.sailsrc` to include the `captain-vane-generator` like so:

```
...
  "generators": {
    "modules": {
      "factory": "captain-vane-generator"
    }
  },
...
```

And voila! captain-vane is all good to sail!

## Usage

Say you have a model called `User.js`. Run

```sh
sails generate factory user
```

This will generate a boilerplate factory in `config/factories/user.js`. Below is the content of the file generated

```js
const { fake } = require("captain-vane");
module.exports = {
  id: fake.randUuid(),
};
```

You can then go on to add the attributes that the User model requires like `firstName`, 'lastName` etc. Let's add a few of these attributes to the user factory

```js
const { fake } = require("captain-vane");
module.exports = {
  id: fake.randUuid(),
  email: fake.randEmail(),
  firstName: fake.randFirstName(),
  lastName: fake.randLastName(),
};
```

> captain-vane exposes all the fake data exposed by the [falso](https://ngneat.github.io/falso/) library.

After the above setup for the user factory, you can call the `vane` helper exposed by `captain-vane` in your test or even in the Sails console or [guppy](https://guppy.sailscasts.com) to create new users.

```js
const newFakeUser = await sails.helpers.vane("user");
```

## Overriding factory data

The `vane` helper allows you to override all factory data. Let's say you want to specify an admin email for a particular fake user, you can do so by calling the `vane` helper like so:

```js
const newFakeAdminUser = await sails.helpers.vane.with({
  model: "user",
  data: { email: "admin@example.com" },
});
```

The value pass will override the fake data that was set in your user factory. You can override as much factory data as you want.
