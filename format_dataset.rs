use std::{fs::{File, OpenOptions}, io::{self, BufRead, BufReader, Error, Write}};

fn main() {
    println!("Building dataset from dataset.txt");
    get_file_content("dataset.txt", "dataset_new.txt").expect("Nothing");
}


pub fn get_file_content(file_name: &str, output: &str) -> Result<(), Error> {
    let file_handler = File::open(file_name).expect("Could not read from file");
    let file_writer = get_bartib_file_writable(output).unwrap();
    let reader = BufReader::new(file_handler);

    // let lines: String = reader
    //     .lines()
    //     .map_while(Result::ok)
    //     .filter(|line| !line.is_empty())
    //     .map(|line| format!("{{\"text\": {:?}}},", line.trim()))
    //     .collect();

    let lines: String = reader
        .lines()
        .map_while(Result::ok)
        .filter(|line| !line.is_empty())
        .map(|line| format!("{}\n", line.trim().replace(". ", ".\n")))
        .collect();

    writeln!(&file_writer, "{}", lines)?;
    Ok(())
}




// create a write handle to a file
fn get_bartib_file_writable(file_name: &str) -> Result<File, io::Error> {
    OpenOptions::new()
        .create(true)
        .write(true)
        .truncate(true)
        .open(file_name)
}

#[test]
fn test_func() {
    assert!(get_file_content("test.txt", "test.json").is_ok());
}