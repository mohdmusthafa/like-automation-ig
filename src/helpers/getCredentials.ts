import colors from 'colors/safe';
import prompt from 'prompt';
import { UserInput } from "../common";

export const getCredentials = async () => {
    let inputs: UserInput = await prompt.get([
        {
          name: "username",
          required: true,
          message: "username is not allowed to be empty",
          description: colors.white("Enter your username"),
        },
        {
          name: "password",
          required: true,
          message: "password is not allowed to be empty",
          description: colors.white("Enter your password"),
        },
        {
          name: "sleep",
          required: true,
          message: "sleep is not allowed to be empty",
          description: colors.white("Enter sleep in seconds"),
          type: "number",
        },
      ]);

      return inputs
}