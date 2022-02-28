// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { replaceLastOccurrenceInString, capitalice, template } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "make-mui-style.makeMeStyle",
    async () => {
      const folders = vscode.workspace.workspaceFolders;
      let fileNamePath = vscode.window.activeTextEditor?.document.fileName; //filename with current path (\Desktop\Nueva carpeta\....)

      if (!folders || !fileNamePath) {
        const message = "There is not file active yet";
        vscode.window.showErrorMessage(message);
        return;
      }
      const fileNameSplitted = fileNamePath.split("\\");
      const fileNameWithExt = fileNameSplitted[fileNameSplitted.length - 1]; //file name with  extension
      const currentPath = fileNamePath.replace(fileNameWithExt, "");

      console.log({ fileNameWithExt, fileNameSplitted, currentPath });

      const splitedDot = fileNameWithExt.split(".");
      const ext = splitedDot[splitedDot.length - 1];

      const styleNameFile = replaceLastOccurrenceInString(
        `${capitalice(fileNameWithExt.replace(ext, ""))}Styles`,
        ".",
        ""
      );

      //check if the style file exists

      const styleFullPath = `${currentPath}${styleNameFile}.ts`;
      const uri = vscode.Uri.file(styleFullPath);

      try {
        await vscode.workspace.fs.stat(uri);
        vscode.workspace.fs.stat(uri);
        vscode.window.showTextDocument(uri, {
          viewColumn: vscode.ViewColumn.Beside,
        });
        vscode.window.showErrorMessage(`${uri.toString(true)} file exist`);
        return;
      } catch (error) {
        console.log({ error });
        const wsedit = new vscode.WorkspaceEdit();
        wsedit.createFile(uri, { ignoreIfExists: false });
        await vscode.workspace.applyEdit(wsedit);

        const textDocument = await vscode.workspace.openTextDocument(uri);
        const doc = await vscode.window.showTextDocument(
          textDocument,
          1,
          false
        );
        doc.edit((e) => {
          e.insert(
            new vscode.Position(0, 0),
            template(capitalice(styleNameFile))
          );
        });
        vscode.env.clipboard.writeText(`./${styleNameFile}.ts`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
