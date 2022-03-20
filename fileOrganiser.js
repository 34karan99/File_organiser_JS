
let fs=require("fs");
let path=require("path");
let inputArr=process.argv;
let inputpath = inputArr[2];
let folderExists = fs.existsSync(inputpath);

let extension={
    Audio:[".mp3",".wav"],
    Video:[".mp4",".mkv",".3gp",".mov",".wmv",".avi",".flv"],
    Document:[".doc",".docx",".ppt",".txt",".xlsx"],
    Software:[".apk",".exe"],
    Image:[".jpg",".jpeg",".png",".gif"]
}

if(folderExists){
    let folderContent=fs.readdirSync(inputpath);
    for(let i=0; i<folderContent.length; i++){
        //  console.log(folderContent[i]);

         let ext = path.extname(folderContent[i]);
         let ext_exist = ext.length;
         if(ext_exist>0){
            let nameOfFolder=giveFolderName(ext); 
            // console.log(ext+" ----> "+ nameOfFolder);
            let folder_path = path.join(inputpath,nameOfFolder);
            let exist = fs.existsSync(folder_path);
            if(exist){
                move_file(inputpath,folder_path,folderContent[i]);
            }
            else{
                fs.mkdirSync(folder_path);
                move_file(inputpath,folder_path,folderContent[i]);
            }
        }
        
        //  console.log(folderContent[i] +"  ---> "+ ext)
        // let nameOfFolder=giveFolderName(ext); 
        // console.log(ext+" ----> "+ nameOfFolder);
        // let folder_path = path.join(inputpath,nameOfFolder);
    }



}
else{
    console.log("Enter a valid path");
}


function giveFolderName(ext){
    for(let key in extension){
        let ext_arr = extension[key];
        if(ext_arr.includes(ext)){
            return key;
        }
    }
    return 'others';
}

function move_file(inputpath,folder_path,filename){
    let sourcePath = path.join(inputpath,filename);
    let destinationpath = path.join(folder_path,filename);
    fs.copyFileSync(sourcePath,destinationpath);
    fs.unlinkSync(sourcePath);
}