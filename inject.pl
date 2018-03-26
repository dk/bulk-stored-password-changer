print "var text = '';\n";
while (<>) {
	chomp;
	s/\\n/\\\\n/g;
	print "text = text + '$_\\n';\n" 
}
