// Cube Model

CubeModel = function(){
	this.model = [1,1,1,1,1,1,1,1,1,	//R
			 	  2,2,2,2,2,2,2,2,2,	//L
			 	  3,3,3,3,3,3,3,3,3,	//F
			 	  4,4,4,4,4,4,4,4,4,	//B
			 	  5,5,5,5,5,5,5,5,5,	//U
			 	  6,6,6,6,6,6,6,6,6];	//D

/*
 *		5
 *	1	3	2	4
 *		6
 */

	this.solved = this.model.slice(0);

	this.reset = function(){
		this.model = this.solved.slice(0);
	}

	//if you don't allow E,S,M moves this is a bit easier.
	this.isSolved = function(){
		for(var i=0; i < 5; i++)
			for(var j=i*9; j < i*9+9; j++)
				if (this.model[i*9] != this.model[j])
					return false;

		return true;
	}

	//direction 0 clockwise, 1 counterclockwise.
	this.U = function(direction){

		var c1 = [36,38,44,42] ;
		var c2 = [24,15,33, 6];
		var c3 = [26,17,35, 8];

		var e1 = [37,41,43,39];
		var e2 = [25,16,34, 7];

		this.arbitraryMove(c1,c2,c3,e1,e2,direction);
	}

	this.L = function(direction){
		var c1 = [8 ,6 ,0 ,2 ];
		var c2 = [38,29,51,24];
		var c3 = [44,35,45,18];

		var e1 = [5 ,7 ,3 ,1 ];
		var e2 = [48,21,41,32];

		this.arbitraryMove(c1,c2,c3,e1,e2,direction);
	}

	this.F = function(direction){

		var c1 = [26,24,18,20] ;
		var c2 = [51,9 ,42,8 ];
		var c3 = [53,15,44,2 ];

		var e1 = [25,21,19,23];
		var e2 = [52,12,43,5 ];

		this.arbitraryMove(c1,c2,c3,e1,e2,direction);
	}

	this.R = function(direction){

		var c1 = [17,15, 9,11];
		var c2 = [36,26,53,27];
		var c3 = [42,20,47,33];

		var e1 = [14,16,12,10];
		var e2 = [23,50,30,39];

		this.arbitraryMove(c1,c2,c3,e1,e2,direction);
	}

	this.D = function(direction){

		var c1 = [53,51,45,47];
		var c2 = [29,11,20,2 ];
		var c3 = [27,9 ,18,0 ];

		var e1 = [52,48,46,50];
		var e2 = [28,10,19,1 ];

		this.arbitraryMove(c1,c2,c3,e1,e2,direction);
	}

	this.B = function(direction){

		var c1 = [27,29,35,33];
		var c2 = [38,17,47,0 ];
		var c3 = [36,11,45,6 ];

		var e1 = [28,32,34,30];
		var e2 = [37,14,46,3 ];

		this.arbitraryMove(c1,c2,c3,e1,e2,direction);
	}

	//E S & M
	this.E = function (direction){		//equator slice, same direction as D
		var c1 = [32,14,23,5 ];
		var c2 = [4 ,31,13,22];
		var c3 = [3 ,30,12,21];

		if (!direction){
			this.rotate(c1);
			this.rotate(c2);
			this.rotate(c3);
		}
		else{
			this.rotate(c1.reverse());
			this.rotate(c2.reverse());
			this.rotate(c3.reverse());
		}
	}

	this.S = function (direction){		//Front slice, same direction as F
		var c1 = [39,7 ,48,10];
		var c2 = [40,4 ,49,13];
		var c3 = [41,1 ,50,16];

		if (!direction){
			this.rotate(c1);
			this.rotate(c2);
			this.rotate(c3);
		}
		else{
			this.rotate(c1.reverse());
			this.rotate(c2.reverse());
			this.rotate(c3.reverse());
		}
	}

	this.M = function (direction){	//Middle slice, same direction as L

		var c1 = [28,37,25,52];
		var c2 = [31,40,22,49];
		var c3 = [43,19,46,34];

		if (!direction){
			this.rotate(c1);
			this.rotate(c2);
			this.rotate(c3);
		}
		else{
			this.rotate(c1.reverse());
			this.rotate(c2.reverse());
			this.rotate(c3.reverse());
		}
	}

	this.arbitraryMove = function(corners1, corners2, corners3, edges1, edges2, direction){
		if (direction){		//clockwise
			this.rotate(corners1);
			this.rotate(corners2);
			this.rotate(corners3);

			this.rotate(edges1);
			this.rotate(edges2);
		}
		else{
			this.rotate(corners1.reverse());
			this.rotate(corners2.reverse());
			this.rotate(corners3.reverse());

			this.rotate(edges1.reverse());
			this.rotate(edges2.reverse());
		}
	}

	//moves a->b->c->d (clockwise)
	this.rotate = function (s){
		var a = s[0];
		var b = s[1];
		var c = s[2];
		var d = s[3];

		var tmp = this.model[a];

		this.model[a] = this.model[d];
		this.model[d] = this.model[c];
		this.model[c] = this.model[b];
		this.model[b] = tmp;
	}

	//takes series of moves in an array formatted ["F", "U", "R", "U'", "R'", "F'"]
	this.doMoves = function (s){
		for(var i=0; i<s.length; i++){
			if (s[i] == "")
				continue;
			else{
				if (s[i].length == 2){
					if (s[i][1] == "2"){
						this[s[i][0]]();
						this[s[i][0]]();
					}
					else
						this[s[i][0]](1);
				}
				else
					this[s[i][0]]();
			}
		}
	}
}