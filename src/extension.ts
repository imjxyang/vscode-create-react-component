import * as vscode from "vscode";

import * as path from "path";
import * as fs from "fs";
import { generateComponentTemplate, generateTestTemplate } from "./template";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "create-react-component.create",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active text editor found.");
        return;
      }

      const folderPath = path.dirname(editor.document.uri.fsPath);
      const testsFolderPath = path.join(folderPath, "__tests__");

      if (!fs.existsSync(testsFolderPath)) {
        fs.mkdirSync(testsFolderPath);
      }

      vscode.window
        .showInputBox({
          prompt: "Enter the name of the component:",
        })
        .then((componentName) => {
          if (componentName) {
            const componentPath = path.join(folderPath, componentName + ".tsx");
            const testPath = path.join(
              testsFolderPath,
              componentName + ".test.tsx"
            );

            const componentContent = generateComponentTemplate(componentName);
            const testContent = generateTestTemplate(componentName);

            fs.writeFileSync(componentPath, componentContent);
            fs.writeFileSync(testPath, testContent);

            vscode.window.showInformationMessage(
              `Template code generated for ${componentName}`
            );
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
