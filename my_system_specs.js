const os = require('os')
var fs = require('fs')

async function  object_to_dict(dict_file,stream_file){
    await stream_file.once('open',function(fd){
        for (const item in dict_file){
            if(item !== "CPUS"){
                stream_file.write(item + " = "+ dict_file[item]+"\n")
            }
            else if(item == "CPUS"){
                stream_file.write("ALL CPU's Specification"+"\n")
                dict_file["CPUS"].forEach(cpu => {
                    stream_file.write("Model"+" = "+cpu['model']+" : ")
                    stream_file.write("Speed"+" = "+ cpu['speed']+"\n")
                });
            }
        }
        stream_file.end();
    })
}

var my_file_stream = fs.createWriteStream("my_file.txt")
var system_specs = {
    "Host-Name": os.hostname(),
    "Ram": (os.totalmem() / 1024 / 1024 /1024).toString() + " GB",
    "Total-CPUs": os.cpus().length,
    "CPUS": os.cpus(),
    "Platform": os.platform(),
}
object_to_dict(system_specs, my_file_stream)
