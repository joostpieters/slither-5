#include <bits/stdc++.h>
 
using namespace std;
 
#define SPEED ios::sync_with_stdio(false); cin.tie(0)
#define ll long long int
#define FF first
#define SS second
#define pb push_back
#define sd(x) scanf("%d",&x)
#define slld(x) scanf("%lld",&x)
#define pd(x) printf("%d\n",x)
#define plld(x) printf("%lld\n",x)
#define pss printf
#define MOD 1000000007
#define INF 1e18
#define eps 0.00001
#define debug(n1) cout<<n1<<endl
#define fr(var,start,end) for (int var = start; var <=end; var++)

typedef pair<int,int> ii;
typedef vector<ii> vii;
typedef vector<int> vi;

bool sortcol( const vector<int>& v1,
               const vector<int>& v2 ) {
    return v1[1] > v2[1];
}

int main()
{
	int t;
	sd(t);
	while(t--)
	{
		int n,d,D,t,s;
		sd(n);
		sd(d);
		vector <int> ar[n+1];
		fr(i,1,n)
		{
			sd(D);
			sd(t);
			sd(s);
			a[i].pb(D);
			a[i].pb(t);
			a[i].pb(s);
		}
		sort(a.begin(), a.end(),sortcol);
	//sort(a[1],a[1]+n);	
	}
}